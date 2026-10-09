import React, { useState } from 'react';
import { PawIcon } from './Icons';

export const SizeCalculator: React.FC = () => {
  const [unit, setUnit] = useState<'in' | 'cm'>('in');
  const [chest, setChest] = useState<string>('16');
  const [neck, setNeck] = useState<string>('11');
  const [back, setBack] = useState<string>('12');

  const chestNum = parseFloat(chest) || 0;
  const neckNum = parseFloat(neck) || 0;
  const backNum = parseFloat(back) || 0;

  const chestInches = unit === 'in' ? chestNum : chestNum / 2.54;
  const backInches = unit === 'in' ? backNum : backNum / 2.54;

  let recommendedSize = 'Small (S)';
  let positiveEaseInches = 1.5;
  let breedNote = 'Standard proportion fit. Follow Small stitch counts for collar and chest.';

  if (chestInches <= 14.5) {
    recommendedSize = 'Toy / XS';
    positiveEaseInches = 1.0;
    breedNote = 'Use fine or light worsted (#3 or #4) yarn so the collar ribbing stays lightweight.';
  } else if (chestInches <= 18.5) {
    recommendedSize = 'Small (S)';
    positiveEaseInches = 1.5;
    breedNote =
      backInches > 14
        ? 'Long-backed small dog detected (e.g., Dachshund). Crochet Small chest width and add 2 to 3 inches of extra back rows.'
        : 'Matches standard Small (S) chest and back proportions.';
  } else if (chestInches <= 23.5) {
    recommendedSize = 'Medium (M)';
    positiveEaseInches = 1.75;
    breedNote =
      neckNum / (chestNum || 1) > 0.72
        ? 'Broad neck-to-chest ratio (common in French Bulldogs and Pugs). Add 2 extra chains to the neck opening for easy slip-on fit.'
        : 'Matches standard Medium (M) chest girth.';
  } else {
    recommendedSize = 'Large (L)';
    positiveEaseInches = 2.0;
    breedNote = 'For large dogs, work a 2-inch ribbed chest belly band for secure coverage on active walks.';
  }

  const finishedSweaterChest =
    unit === 'in'
      ? `${(chestNum + positiveEaseInches).toFixed(1)} in`
      : `${(chestNum + positiveEaseInches * 2.54).toFixed(1)} cm`;

  return (
    <div className="my-8 rounded-2xl border border-cream-200 bg-cream-100/70 p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cream-200 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral-100 text-coral-600">
            <PawIcon size={18} />
          </span>
          <div>
            <h3 className="font-display text-base font-semibold text-brown-900">
              Interactive Dog Sweater Size &amp; Ease Calculator
            </h3>
            <p className="text-xs text-brown-600">
              Enter your dog&apos;s snug standing measurements to calculate finished garment width
            </p>
          </div>
        </div>

        {/* Unit Selector */}
        <div className="inline-flex rounded-lg border border-cream-200 bg-white p-1">
          <button
            type="button"
            onClick={() => {
              if (unit !== 'in') {
                setUnit('in');
                setChest(String(Math.round((chestNum / 2.54) * 10) / 10));
                setNeck(String(Math.round((neckNum / 2.54) * 10) / 10));
                setBack(String(Math.round((backNum / 2.54) * 10) / 10));
              }
            }}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
              unit === 'in' ? 'bg-brown-900 text-cream-50' : 'text-brown-700 hover:text-brown-900'
            }`}
          >
            Inches (in)
          </button>
          <button
            type="button"
            onClick={() => {
              if (unit !== 'cm') {
                setUnit('cm');
                setChest(String(Math.round(chestNum * 2.54)));
                setNeck(String(Math.round(neckNum * 2.54)));
                setBack(String(Math.round(backNum * 2.54)));
              }
            }}
            className={`rounded-md px-3 py-1 text-xs font-medium transition-colors whitespace-nowrap ${
              unit === 'cm' ? 'bg-brown-900 text-cream-50' : 'text-brown-700 hover:text-brown-900'
            }`}
          >
            Centimeters (cm)
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="calc-neck" className="block text-xs font-medium text-brown-800">
            1. Neck Circumference ({unit})
          </label>
          <input
            id="calc-neck"
            type="number"
            min="4"
            max="80"
            step="0.5"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-cream-300 bg-white px-3.5 py-2 font-mono text-sm text-brown-900 tabular-nums focus:border-coral-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="calc-chest" className="block text-xs font-medium text-brown-800">
            2. Chest Girth — Widest ({unit})
          </label>
          <input
            id="calc-chest"
            type="number"
            min="6"
            max="110"
            step="0.5"
            value={chest}
            onChange={(e) => setChest(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-cream-300 bg-white px-3.5 py-2 font-mono text-sm text-brown-900 tabular-nums focus:border-coral-500 focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="calc-back" className="block text-xs font-medium text-brown-800">
            3. Back Length ({unit})
          </label>
          <input
            id="calc-back"
            type="number"
            min="5"
            max="90"
            step="0.5"
            value={back}
            onChange={(e) => setBack(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-cream-300 bg-white px-3.5 py-2 font-mono text-sm text-brown-900 tabular-nums focus:border-coral-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-cream-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs text-brown-600">Recommended Pattern Size:</span>
            <p className="font-display text-lg font-bold text-coral-600">{recommendedSize}</p>
          </div>
          <div>
            <span className="text-xs text-brown-600">Target Finished Sweater Chest (with ease):</span>
            <p className="font-mono text-base font-semibold text-brown-900 tabular-nums">
              {finishedSweaterChest}
            </p>
          </div>
        </div>
        <p className="mt-2.5 border-t border-cream-100 pt-2.5 text-xs text-brown-700">
          <strong className="font-semibold text-brown-900">Fit Adjustment Note:</strong> {breedNote}
        </p>
      </div>
    </div>
  );
};
