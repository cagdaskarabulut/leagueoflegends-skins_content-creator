"use client";
import { useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  let heroName = "Aatrox";

  const [result, setResult] = useState();

  async function findAnswer(heroName) {
    await fetch("/api/chat-gpt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: question,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        let response = Object.values(resData.choices);
        let onlyFirstResponse = response[0]?.message?.content;
        setResult(onlyFirstResponse);
      });
  }

  return (
    <main className={styles.main}>
      <button
        onClick={async () =>
          findAnswer(`Prepare a long article for the home page of the website I developed about the League of Legends game, talking about the release of the game, explaining the game, talking about the story of the game, talking about the history of the game, the reflections of the game in real life and the tournaments of the game. Also, mention that the site includes the story, gameplay, tactics of each hero, the history of their costumes, and costume videos.Write in English and have at least 1000 words. Return with html tags in div format without style.`)
          findAnswer(`When is fenerbahce's next match?`)
        }
      >
        Hit API
      </button>

      {/* for using html style */}
      <div dangerouslySetInnerHTML={ {__html: result} } />

      {/* for getting html as simple string */}
      <div>{result}</div>

    </main>
  );
}
