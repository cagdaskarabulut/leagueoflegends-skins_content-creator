"use client";
import { useState } from "react";
import styles from "./page.module.css";
import { heroList } from "data/heroList";

export default function Home() {

  return (
    <>
      <br />
      <h1>Amacı: </h1>
      <h2>
        Chatgpt api ile her sayfa için birbirinden farklı içerik oluştulur ve
        oluşturulan içerikler ile hero bazlı json dosyalaarı oluşturulur.
      </h2>
      <br />
      <br />
      <h1>Kullanımı:</h1>
      <h2>
        1- data/heroList.js dosyasına ilgili hero ve skinsler için gerekli
        bilgiler eklenir.
      </h2>
      <h2>
        2- localhost:3000/Xin-Zhao şeklinde ilgili hero sayfasına girilince tüm
        skinleri için içerik oluşturulup ekrana yazdırılır. (Eğer çok fazla
        kostümü olan hero varsa onun için data/heroList.js dosyasına skinler
        parça parça eklenerek çalıştırılabilir)
      </h2>
    </>
  );
}
