import { useEffect, useState, VFC, FormEvent } from 'react';
import styles from './styles/images.module.scss';

export const Hoge: VFC<{ foo: string }> = (props) => {
  const [images, setImages] = useState<string[]>([]);
  const [breed, setBreed] = useState('shiba');
  const [formText, setFormText] = useState<string>('');

  const fetchImages = async (breed: string): Promise<string[]> => {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/12`);
    const data = await response.json();
    console.log('fetchImages');
    return data.message;
  };

  const a = async () => {
    const image = await fetchImages(breed);
    console.log('a');
    setImages(image);
  };

  useEffect(() => {
    a();
  }, [breed]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const image = await fetchImages(formText);
    setImages(image);
    setFormText('');
  };

  return (
    <div>
      <h1 className={styles.foo}>{props.foo}</h1>
      <select
        name=""
        id=""
        value={breed}
        onChange={(event) => {
          setBreed(event.target.value);
        }}
      >
        <option value="shiba">shiba</option>
        <option value="akita">akita</option>
      </select>
      <form onSubmit={(e) => onSubmit(e)}>
        <input value={formText} onChange={(e) => setFormText(e.target.value)} />
        <button type="submit">検索</button>
      </form>
      <ul>
        {images.map((src) => (
          <li key={src}>
            <img src={src} alt="犬" />
          </li>
        ))}
      </ul>
    </div>
  );
};

const main = async () => {};
