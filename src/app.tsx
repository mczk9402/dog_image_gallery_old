import { useEffect, useState, VFC } from "react";
import styles from "./styles/images.module.scss";

export const Hoge: VFC<{ foo: string }> = (props) => {
  const [images, setImages] = useState<string[]>([]);
  const [breed, setBreed] = useState("shiba");

  useEffect(() => {
    async function fetchImages(breed: string): Promise<string[]> {
      const response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random/12`);
      const data = await response.json();
      return data.message;
    }

    const a = async () => {
      const image = await fetchImages(breed);
      setImages(image);
    };

    a();
  }, [breed]);

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
