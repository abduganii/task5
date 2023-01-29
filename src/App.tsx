import { UsableLocale } from '@faker-js/faker/faker';
import { ChangeEvent, Dispatch, useState } from 'react';
import { UserList } from './UserList';

export const App = () => {
  const [locale, setLocale] = useState('en_AU' as UsableLocale);
  const [typoRate, setTypoRate] = useState(0);
  const [seed, setSeed] = useState(0);

  const randomSeed = () => {
    return Math.round(Math.random() * 2_147_483_647);
  }

  const handleChangeLocale = (event: ChangeEvent) => {
    const target = event.target as HTMLSelectElement;
    setLocale(target.value as UsableLocale);
  }

  function getChangeNumber(
    setter: Dispatch<number>,
    float?: boolean,
    min?: number,
    max?: number
  ) {
    return (event: ChangeEvent) => {
      const target = event.target as HTMLInputElement;
      let value = float
        ? parseFloat(target.value)
        : parseInt(target.value);
      if (isNaN(value)) value = min ?? 0;
      if (min && value < min) value = min;
      if (max && value > max) value = max;
      setter(value);
    };
  }

  const typoRateHandler = getChangeNumber(setTypoRate, true, 0, 10000);

  return (
    <div className="container">
      <article>
        <header>
          <h1>Computer, generate me some fake people!</h1>
        </header>
        <div className="grid">
          <label>
            Locale
            <select onChange={handleChangeLocale} value={locale}>
              <option value="en_AU">English</option>
              <option value="ru">Russian</option>
              <option value="de_AT">German</option>
            </select>
          </label>
          <label>
            Typos
            <input
              type="range"
              step="0.1"
              min="0"
              max="10"
              value={typoRate}
              onChange={typoRateHandler}></input>
            <input
              type="number"
              min="0"
              max="10000"
              value={typoRate}
              onChange={typoRateHandler}></input>
          </label>
          <label>
            Seed
            <input
              type="number"
              value={seed}
              onChange={getChangeNumber(setSeed)}></input>
            <button onClick={() => setSeed(randomSeed())}>
              Random
            </button>
          </label>
        </div>
      </article>
      <UserList seed={seed} locale={locale} typos={typoRate} />
    </div>
  );
}
