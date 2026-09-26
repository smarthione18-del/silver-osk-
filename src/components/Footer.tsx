import React, { useState } from 'react';
import { ViewMode } from '../types';

interface FooterProps {
  onNavigate: (view: ViewMode) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="w-full bg-[#06102b] text-[#ffffff] mt-16 border-t border-[#1c2541]">
      <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto pt-14 pb-12">
        {/* Brand Banner & Literary Motto */}
        <div className="pb-8 mb-8 border-b border-[#1c2541] flex flex-col md:flex-row items-center justify-between gap-6">
          <div
            onClick={() => onNavigate('discover')}
            className="flex items-center gap-4 cursor-pointer group"
          >
            <img
              alt="StoryWeave Brand Logo"
              className="h-8 w-auto object-contain brightness-0 invert group-hover:scale-105 transition-transform"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VSvdTRewgs___1wSoWjbr71ValK9el78m6kCSYL-9AmYusBfvd24zQmycAdfu2o1Z6F7NZLzuRKERG-82YQxP9aGaIqdTAzsrBlnGCcNwX4nbU2NVggvCCgSozMUBylS6iK_rBn-VKd209avJk0sYlHDpVebIKitwUidNqsbtWw53czPhX9OBHtb-O8tvPz4vSIscIxOTleUkScLaSZazfQQI9AskZ8Buj2F70AYPNEcakf4Ke5Hae-Qg"
            />
            <span className="font-serif text-2xl text-white font-bold">StoryWeave</span>
          </div>
          <blockquote className="font-serif text-lg sm:text-xl italic text-[#dbe1ff] max-w-xl text-center md:text-right">
            “Stories are threads that weave our humanity together.”
          </blockquote>
        </div>

        {/* 5 Column Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 py-4">
          {/* Col 1: Exploration */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-wider text-[#dbe1ff] font-bold font-sans">
              Exploration
            </span>
            <ul className="flex flex-col gap-2 text-sm text-[#838cae]">
              <li>
                <button
                  onClick={() => onNavigate('explore-by-age')}
                  className="hover:text-white transition-colors text-left"
                >
                  By Age Groups
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('genres')}
                  className="hover:text-white transition-colors text-left"
                >
                  Folklore &amp; Myths
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('genres')}
                  className="hover:text-white transition-colors text-left"
                >
                  Audio Narratives
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('discover')}
                  className="hover:text-white transition-colors text-left"
                >
                  Illustrated Editions
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: For Storytellers */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-wider text-[#dbe1ff] font-bold font-sans">
              For Storytellers
            </span>
            <ul className="flex flex-col gap-2 text-sm text-[#838cae]">
              <li>
                <a href="#submit" onClick={(e) => { e.preventDefault(); alert("Autumnal Solstice Anthology manuscripts are currently open to registered Scholars!"); }} className="hover:text-white transition-colors">
                  Submit a Story
                </a>
              </li>
              <li>
                <a href="#guild" onClick={(e) => { e.preventDefault(); alert("The StoryWeave Writers Guild hosts bi-weekly folio critique salons."); }} className="hover:text-white transition-colors">
                  Writers Guild
                </a>
              </li>
              <li>
                <a href="#guidelines" onClick={(e) => { e.preventDefault(); alert("Folio standard: minimum 600 words with historical or mythic resonance."); }} className="hover:text-white transition-colors">
                  Publishing Guidelines
                </a>
              </li>
              <li>
                <a href="#grants" onClick={(e) => { e.preventDefault(); alert("Scholastic grant applications for translation open in November."); }} className="hover:text-white transition-colors">
                  Anthology Grants
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Community */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-wider text-[#dbe1ff] font-bold font-sans">
              Community
            </span>
            <ul className="flex flex-col gap-2 text-sm text-[#838cae]">
              <li>
                <a href="#salon" onClick={(e) => { e.preventDefault(); alert("Today's Literary Salon Discussion: 'The Allegorical Silk Trade parables on grief' (84 annotations)."); }} className="hover:text-white transition-colors">
                  Literary Salon
                </a>
              </li>
              <li>
                <a href="#clubs" onClick={(e) => { e.preventDefault(); alert("Global Book Clubs: Currently reading 'The Clockwork Alchemist of Prague'."); }} className="hover:text-white transition-colors">
                  Global Book Clubs
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('my-library')}
                  className="hover:text-white transition-colors text-left"
                >
                  Reading Challenges
                </button>
              </li>
              <li>
                <a href="#discussions" onClick={(e) => { e.preventDefault(); alert("Scholars discussion codex: 1,420 annotated passages."); }} className="hover:text-white transition-colors">
                  Discussions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Access */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-wider text-[#dbe1ff] font-bold font-sans">
              Legal &amp; Access
            </span>
            <ul className="flex flex-col gap-2 text-sm text-[#838cae]">
              <li>
                <a href="#accessibility" onClick={(e) => { e.preventDefault(); alert("StoryWeave supports OpenDyslexic typography, screen reader landmarks, and zero blue-light warm tone modes."); }} className="hover:text-white transition-colors">
                  Accessibility Statement
                </a>
              </li>
              <li>
                <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("StoryWeave values reader privacy: no ad telemetry, ad-free prose."); }} className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" onClick={(e) => { e.preventDefault(); alert("StoryWeave literary commons and publishing terms."); }} className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#content" onClick={(e) => { e.preventDefault(); alert("Every story is reviewed by literacy educators and certified for appropriate Lexile age-bands."); }} className="hover:text-white transition-colors">
                  Content Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: The Weekly Quill */}
          <div className="flex flex-col gap-3">
            <span className="text-[11px] uppercase tracking-wider text-[#dbe1ff] font-bold font-sans">
              The Weekly Quill
            </span>
            <p className="text-sm text-[#838cae]">
              Curated weekend reads and newly translated mythologies directly to your study.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mt-1">
              <input
                className="bg-[#1c2541] text-white text-sm px-3.5 py-2 rounded-lg placeholder:text-[#838cae] focus:outline-none focus:ring-1 focus:ring-[#be8222] border border-[#1c2541]"
                placeholder="scholar@parchment.org"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="bg-[#be8222] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#feb956] hover:text-[#1d0f00] transition-colors text-center font-semibold shadow-sm"
                type="submit"
              >
                {subscribed ? 'Dispatched to Study ✓' : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Baseline Copyright & Icon Row */}
        <div className="pt-8 mt-8 border-t border-[#1c2541] flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#838cae]">
          <p>© 2026 StoryWeave Anthology. All literary rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('discover')}
              className="hover:text-white transition-colors"
              title="Archive Index"
            >
              <span className="material-symbols-outlined text-[20px]">menu_book</span>
            </button>
            <button
              onClick={() => onNavigate('genres')}
              className="hover:text-white transition-colors"
              title="Audio Feeds"
            >
              <span className="material-symbols-outlined text-[20px]">podcasts</span>
            </button>
            <button
              onClick={() => onNavigate('discover')}
              className="hover:text-white transition-colors"
              title="Forum Feeds"
            >
              <span className="material-symbols-outlined text-[20px]">forum</span>
            </button>
            <button
              onClick={() => alert("RSS feed: https://storyweave.literary/rss.xml")}
              className="hover:text-white transition-colors"
              title="Newsletter Feed"
            >
              <span className="material-symbols-outlined text-[20px]">rss_feed</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
