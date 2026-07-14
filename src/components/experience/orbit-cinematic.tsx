"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Rocket, Sparkles, Volume2, VolumeX, X } from "lucide-react";

type OrbitExperienceContextValue = {
  armSound: () => void;
  celebrate: () => Promise<void>;
};

const OrbitExperienceContext = createContext<OrbitExperienceContextValue>({
  armSound: () => undefined,
  celebrate: async () => undefined,
});

type AudioContextConstructor = typeof AudioContext;

function getAudioContextConstructor(): AudioContextConstructor | undefined {
  return (
    window.AudioContext ??
    (window as typeof window & { webkitAudioContext?: AudioContextConstructor })
      .webkitAudioContext
  );
}

export function OrbitCinematic({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<AudioContext | null>(null);
  const celebrationTimerRef = useRef<number | null>(null);
  const [showArrival, setShowArrival] = useState(false);
  const [ignited, setIgnited] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSoundEnabled(window.localStorage.getItem("orbit-sound") !== "off");
      if (window.sessionStorage.getItem("orbit-arrival-seen") !== "yes") {
        setShowArrival(true);
      }
    });

    return () => {
      window.cancelAnimationFrame(frame);
      if (celebrationTimerRef.current) window.clearTimeout(celebrationTimerRef.current);
    };
  }, []);

  const getAudio = useCallback(() => {
    if (!soundEnabled) return null;
    if (!audioRef.current) {
      const AudioConstructor = getAudioContextConstructor();
      if (!AudioConstructor) return null;
      audioRef.current = new AudioConstructor();
    }
    void audioRef.current.resume();
    return audioRef.current;
  }, [soundEnabled]);

  const armSound = useCallback(() => {
    getAudio();
  }, [getAudio]);

  const playTone = useCallback(
    (frequency: number, start: number, duration: number, volume: number) => {
      const audio = getAudio();
      if (!audio) return;
      const oscillator = audio.createOscillator();
      const gain = audio.createGain();
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(frequency, audio.currentTime + start);
      gain.gain.setValueAtTime(0.0001, audio.currentTime + start);
      gain.gain.exponentialRampToValueAtTime(volume, audio.currentTime + start + 0.035);
      gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + start + duration);
      oscillator.connect(gain).connect(audio.destination);
      oscillator.start(audio.currentTime + start);
      oscillator.stop(audio.currentTime + start + duration + 0.04);
    },
    [getAudio]
  );

  const playLaunch = useCallback(() => {
    const audio = getAudio();
    if (!audio) return;
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(90, audio.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(620, audio.currentTime + 0.9);
    gain.gain.setValueAtTime(0.0001, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.045, audio.currentTime + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + 1.05);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + 1.1);
    [523.25, 659.25, 783.99].forEach((note, index) =>
      playTone(note, 0.42 + index * 0.16, 0.55, 0.055)
    );
  }, [getAudio, playTone]);

  const playCelebration = useCallback(() => {
    [523.25, 659.25, 783.99, 1046.5].forEach((note, index) =>
      playTone(note, index * 0.11, 0.7, 0.05)
    );
    playTone(1318.51, 0.52, 0.9, 0.035);
  }, [playTone]);

  const finishArrival = useCallback(() => {
    window.sessionStorage.setItem("orbit-arrival-seen", "yes");
    setShowArrival(false);
  }, []);

  const ignite = useCallback(() => {
    armSound();
    playLaunch();
    setIgnited(true);
    window.setTimeout(finishArrival, 1650);
  }, [armSound, finishArrival, playLaunch]);

  const toggleSound = useCallback(() => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    window.localStorage.setItem("orbit-sound", next ? "on" : "off");
  }, [soundEnabled]);

  const celebrate = useCallback(async () => {
    setCelebrating(true);
    playCelebration();
    await new Promise<void>((resolve) => {
      celebrationTimerRef.current = window.setTimeout(() => {
        setCelebrating(false);
        celebrationTimerRef.current = null;
        resolve();
      }, 1750);
    });
  }, [playCelebration]);

  return (
    <OrbitExperienceContext.Provider value={{ armSound, celebrate }}>
      {children}

      {showArrival && (
        <div
          className={`orbit-arrival ${ignited ? "orbit-arrival--ignited" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to Orbit"
        >
          <div className="orbit-arrival__aurora" />
          <div className="orbit-arrival__stars" />
          <div className="orbit-arrival__path" aria-hidden="true" />
          <div className="orbit-arrival__rocket" aria-hidden="true">
            <span className="orbit-arrival__trail" />
            <Rocket />
          </div>

          <div className="orbit-arrival__content">
            <div className="orbit-arrival__eyebrow">
              <Sparkles className="h-3.5 w-3.5" /> A new connection begins
            </div>
            <h1>Welcome to <span>Orbit</span></h1>
            <p>Where ambition finds its people.</p>
            <button className="orbit-arrival__enter" onClick={ignite} disabled={ignited}>
              <span>{ignited ? "Launching…" : "Ignite your journey"}</span>
              <Rocket className="h-4 w-4" />
            </button>
          </div>

          <div className="orbit-arrival__controls">
            <button onClick={toggleSound} aria-label={soundEnabled ? "Mute sounds" : "Enable sounds"}>
              {soundEnabled ? <Volume2 /> : <VolumeX />}
            </button>
            <button onClick={finishArrival} aria-label="Skip welcome animation">
              <X /> <span>Skip</span>
            </button>
          </div>
        </div>
      )}

      {celebrating && (
        <div className="orbit-celebration" role="status" aria-live="polite">
          <div className="orbit-celebration__glow" />
          {Array.from({ length: 14 }, (_, index) => (
            <span
              className="orbit-shooting-star"
              key={index}
              style={{
                "--star-index": index,
                "--star-delay": `${(index % 7) * 0.08}s`,
                "--star-top": `${4 + ((index * 13) % 62)}%`,
              } as React.CSSProperties}
            />
          ))}
          <div className="orbit-celebration__message">
            <span><Sparkles /></span>
            <p>Welcome to your Orbit</p>
            <small>Your people are waiting</small>
          </div>
        </div>
      )}
    </OrbitExperienceContext.Provider>
  );
}

export function useOrbitExperience() {
  return useContext(OrbitExperienceContext);
}
