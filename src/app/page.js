"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { heroList } from "data/heroList";

export default function Home() {
  let searchName = "Akali";

  const [result, setResult] = useState();

  function replaceStringForUrlFormat(myString) {
    myString = myString.replace(/ /g, "-");
    myString = myString.replace(/'/g, "");
    myString = myString.replace(/"/g, "");
    myString = myString.replace(/\//g, "");
    myString = myString.replace(/&/g, "");
    myString = myString.replace("(", "");
    myString = myString.replace(")", "");
    myString = myString.replace(/ó/g, "o");
    myString = myString.replace(",", "");
    // myString = myString.toLowerCase();
    return myString;
  }

  async function findAnswer(parameterHeroName) {
    let draftResult = "";
    await heroList?.map(async (objectData, index) => {
      let heroName = objectData.heroName;
      let skinName = objectData.skinName;
      let activePath = "";
      if (parameterHeroName.toLowerCase() == heroName.toLowerCase()) {
        if (heroName.toLowerCase() == skinName.toLowerCase()) {
          //skin ana sayfası
          activePath = `${replaceStringForUrlFormat(
            heroName
          )}/${replaceStringForUrlFormat(skinName)}`;

          console.log("if başladı : " + activePath);


          await fetch("/api/chat-gpt", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: `Prepare an article for the page of the hero ${heroName} on the website I developed for the League of Legends game.Write the name of the hero as the title. As a subtitle, if you know, write the release date of the hero, but if you do not know this information, do not create a subtitle. In this article, prepare a long descriptive essay describing the hero, his story, his strengths and weaknesses, his background in the game, and his place in the game. Also mention that you can access information and videos of all skins of your hero on this page. Write in English and have at least 1000 words. Return with html tags in div format without style and never use " mark for being acceptable to use as string.`,
            }),
          }).then((res) => res.json())
            .then((resData) => {
              let response = Object.values(resData.choices);
              let onlyFirstResponse = response[0]?.message?.content;
              draftResult = `${draftResult}
              {
                "newPageUrl": "${activePath}",\n
                "content": "${onlyFirstResponse}"\n
              },\n`;

              console.log("if calisti : " + activePath);
              console.log("if calisti : " + onlyFirstResponse);
              // draftResult = `${draftResult}
              //     {
              //       "newPageUrl": "${activePath}",
              //     },`;
              setResult(draftResult);
            });
        } else {
          //skin detay sayfası
          activePath = `${replaceStringForUrlFormat(
            heroName
          )}/${replaceStringForUrlFormat(skinName)}`;

          console.log("else başladı : " + activePath);

          await fetch("/api/chat-gpt", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prompt: `Prepare an article for the page created for hero ${heroName}'s skin named "${skinName}" on the site developed for the League of Legends game.Write the name of the hero as the title and the name of the skin in parentheses next to it. As a subtitle, if you know, write how many RP the skin costs and the release date of the skin, but if you do not know this information, do not create a subtitle. In the content of this article, I will talk about the story of ${heroName}'s "${skinName}" costume and all the details of the costume in detail, and then make a short narrative about the hero's story, listing his strengths and weaknesses, his past in the game, his place in the game, and then write that you can access information and videos about all the appearances of our hero on this page. end by stating. The article must be in English and consist of at least 1000 words. Return with html tags in div format without style and never use " mark for being acceptable to use as string.`,
            }),
          }).then((res) => res.json())
            .then((resData) => {
              let response = Object.values(resData.choices);
              let onlyFirstResponse = response[0]?.message?.content;
              draftResult = `${draftResult}
              {
                "newPageUrl": "${activePath}",\n
                "content": "${onlyFirstResponse}"\n
              },\n`;

              console.log("else calisti : " + activePath);
              console.log("else calisti : " + onlyFirstResponse);
              // draftResult = `${draftResult}
              //     {
              //       "newPageUrl": "${activePath}",
              //       "content": ""
              //     },`;
              setResult(draftResult);
              
            });
          
        }
      }
    });
    console.log(result);
  }

  return (
    <main className={styles.main}>
      <h1>Generate Content for : {searchName}</h1>
      <button onClick={async () => findAnswer(searchName)}>Hit API</button>

      {/* for using html style */}
      {/* <div dangerouslySetInnerHTML={ {__html: result} } /> */}

      {/* for getting html as simple string */}
      <div>{result}</div>
    </main>
  );
}
