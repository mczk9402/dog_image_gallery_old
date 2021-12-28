import { useEffect, useState, VFC, FormEvent } from 'react';
import styles from './styles/images.module.scss';

export const Hoge: VFC<{ foo: string }> = (props) => {
  const [images, setImages] = useState<string[]>([]);
  const [breed, setBreed] = useState('shiba');
  const [formText, setFormText] = useState<string>('');
  const [breedList, setBreedList] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async (breed: string): Promise<string[]> => {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/12`);
      const data = await response.json();
      console.log('fetchImages');
      return data.message;
    };

    const a = async () => {
      const image = await fetchImages(breed);
      console.log(image);
      setImages(image);
    };

    a();
  }, [breed]);

  useEffect(() => {
    const search = async () => {
      await fetch(`https://dog.ceo/api/breed/${formText}/images/random/12`)
        .then(async (response) => {
          if (!response.ok) return console.error('サーバーエラー');
          setBreed(formText);
        })
        .catch((error) => {
          console.log(error);
        });
    };

    search();
  }, [formText]);

  useEffect(() => {
    const fetchList = async () => {
      await fetch('https://dog.ceo/api/breeds/list/all').then(async (res) => {
        const data = await res.json();
        setBreedList(Object.keys(data.message));
      });
    };
    fetchList();
  }, []);

  return (
    <div>
      <h1>{props.foo}</h1>
      <select
        name=""
        id=""
        value={breed}
        onChange={(event) => {
          setBreed(event.target.value);
          setFormText(event.target.value);
        }}
      >
        {breedList.map((breed, index) => (
          <option value={breed} key={index}>
            {breed}
          </option>
        ))}
      </select>
      <input value={formText} onChange={(e) => setFormText(e.target.value)} />
      {/* <div className="buttonWrapper">
        {breedList.map((breed, index) => (
          <button
            onClick={() => {
              setBreed(breed);
              setFormText(breed);
            }}
            key={index}
          >
            {breed}
          </button>
        ))}
      </div> */}
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
