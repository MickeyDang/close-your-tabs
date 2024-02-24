import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { data } from "../facts/facts";
import styles from "../styles/Home.module.css";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

const Home: NextPage = () => {
  const [numTabs, setNumTabs] = useState(0);
  const [text, setText] = useState("");
  const [fact, setFact] = useState("");
  const [imgSrc, setImgSrc] = useState("");

  const fetchData = async (queryParams) => {
    const response = await fetch(`/api/hello?${queryParams}`);
    const result = (await response.json()).result;
    setNumTabs(result);
  };

  const reset = async (queryParams) => {
    await fetch(`/api/reset?${queryParams}`);
  };

  useEffect(() => {
    const uid = localStorage.getItem("session_id") ?? uuidv4();
    console.log(`uid: ${uid}`);
    const queryParams = new URLSearchParams({
      id: uid,
    });

    fetchData(queryParams);
    localStorage.setItem("session_id", uid);
  }, []);

  useEffect(() => {
    setText(`You opened ${numTabs} tab${numTabs != 1 ? "s" : ""} today`);
    if (numTabs > 0) {
      const factList = data[numTabs] ?? [];
      if (factList.length > 0) {
        setFact(factList[Math.floor(Math.random() * factList.length)]);
      } else {
        setFact(":/");
      }
    }

    if (numTabs === 5) {
      setImgSrc("/fiveguys.png");
    } else {
      setImgSrc("");
    }
  }, [numTabs]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Close Your Tabs</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>{text}</h1>
        <h4 className={styles.fact}>{fact}</h4>
        {imgSrc && (
          <Image
            className={styles.promo}
            alt="an image"
            src={imgSrc}
            width="512"
            height="460"
          />
        )}
        <button
          className={styles.reset}
          onClick={() => {
            const uid = localStorage.getItem("session_id") ?? uuidv4();
            console.log(`uid: ${uid}`);
            const queryParams = new URLSearchParams({
              id: uid,
            });
            reset(queryParams);
          }}
        >
          Reset
        </button>
      </main>
    </div>
  );
};

export default Home;
