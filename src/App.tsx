/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { WaxSealLoveLetter } from './components/WaxSealLoveLetter';
import { LoveTimeline } from './components/LoveTimeline';
import { LoveJar } from './components/LoveJar';
import { PoetryOasis } from './components/PoetryOasis';
import { IntimateCards } from './components/IntimateCards';
import { BucketList } from './components/BucketList';
import { CustomizationModal } from './components/CustomizationModal';
import { Footer } from './components/Footer';
import { FallingPetalsCanvas } from './components/FallingPetalsCanvas';
import { CoupleProfile } from './types';
import { romanticAudio } from './utils/audio';

const DEFAULT_PROFILE: CoupleProfile = {
  partner1: 'يوسف',
  partner2: 'سارة',
  relationshipStartDate: '2024-02-14',
  anniversaryNote: 'معكِ أدركتُ أن للحب وطناً، وأن لروحي ملاذاً آمناً وسكينة لا أبتغي عنها بديلاً.',
};

export default function App() {
  const [profile, setProfile] = useState<CoupleProfile>(() => {
    // Check if parameters are passed in the URL hash
    if (typeof window !== 'undefined' && window.location.hash) {
      try {
        const hash = window.location.hash.replace(/^#/, '');
        const params = new URLSearchParams(hash);
        const p1 = params.get('p1');
        const p2 = params.get('p2');
        const date = params.get('date');
        const note = params.get('note');

        if (p1 || p2 || date) {
          return {
            partner1: p1 || DEFAULT_PROFILE.partner1,
            partner2: p2 || DEFAULT_PROFILE.partner2,
            relationshipStartDate: date || DEFAULT_PROFILE.relationshipStartDate,
            anniversaryNote: note || DEFAULT_PROFILE.anniversaryNote,
          };
        }
      } catch (err) {
        console.error('Failed to parse URL hash params', err);
      }
    }

    // Check localStorage
    const saved = localStorage.getItem('romantic_couple_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_PROFILE;
      }
    }
    return DEFAULT_PROFILE;
  });

  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState<boolean>(false);

  const handleToggleMusic = () => {
    const playing = romanticAudio.toggle();
    setIsMusicPlaying(playing);
  };

  const handleSaveProfile = (newProfile: CoupleProfile) => {
    setProfile(newProfile);
    localStorage.setItem('romantic_couple_profile', JSON.stringify(newProfile));
  };

  const scrollToLetter = () => {
    const el = document.getElementById('letter-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0c090d] text-[#f7f2ea] selection:bg-rose-500/30 selection:text-rose-200">
      {/* Background Floating Petals & Soft Stardust */}
      <FallingPetalsCanvas />

      {/* Main Top Navigation */}
      <Navigation
        isMusicPlaying={isMusicPlaying}
        onToggleMusic={handleToggleMusic}
        onOpenCustomize={() => setIsCustomizeOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <HeroSection
          profile={profile}
          onOpenLetter={scrollToLetter}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
        />

        {/* Section Divider with delicate ornament */}
        <div className="flex items-center justify-center my-6 text-rose-900/60" aria-hidden="true">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-rose-800/40" />
          <span className="mx-4 text-xs font-serif-ar tracking-widest text-rose-400/60">❦</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-rose-800/40" />
        </div>

        {/* Wax Seal Love Letter */}
        <WaxSealLoveLetter profile={profile} />

        {/* Section Divider */}
        <div className="flex items-center justify-center my-8 text-rose-900/60" aria-hidden="true">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-rose-800/40" />
          <span className="mx-4 text-xs font-serif-ar tracking-widest text-rose-400/60">❦</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-rose-800/40" />
        </div>

        {/* Love Memories Timeline */}
        <LoveTimeline profile={profile} />

        {/* Section Divider */}
        <div className="flex items-center justify-center my-8 text-rose-900/60" aria-hidden="true">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-rose-800/40" />
          <span className="mx-4 text-xs font-serif-ar tracking-widest text-rose-400/60">❦</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-rose-800/40" />
        </div>

        {/* Reasons Jar */}
        <LoveJar />

        {/* Section Divider */}
        <div className="flex items-center justify-center my-8 text-rose-900/60" aria-hidden="true">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-rose-800/40" />
          <span className="mx-4 text-xs font-serif-ar tracking-widest text-rose-400/60">❦</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-rose-800/40" />
        </div>

        {/* Poetry Oasis */}
        <PoetryOasis />

        {/* Section Divider */}
        <div className="flex items-center justify-center my-8 text-rose-900/60" aria-hidden="true">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-rose-800/40" />
          <span className="mx-4 text-xs font-serif-ar tracking-widest text-rose-400/60">❦</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-rose-800/40" />
        </div>

        {/* Intimate Conversation Cards */}
        <IntimateCards />

        {/* Section Divider */}
        <div className="flex items-center justify-center my-8 text-rose-900/60" aria-hidden="true">
          <div className="h-px w-24 bg-gradient-to-r from-transparent to-rose-800/40" />
          <span className="mx-4 text-xs font-serif-ar tracking-widest text-rose-400/60">❦</span>
          <div className="h-px w-24 bg-gradient-to-l from-transparent to-rose-800/40" />
        </div>

        {/* Romantic Bucket List */}
        <BucketList />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Customization & Gift Sharing Modal */}
      <CustomizationModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        profile={profile}
        onSaveProfile={handleSaveProfile}
      />
    </div>
  );
}
