"use client";

import { FormEvent, useState } from "react";
import css from "./BookingForm.module.css";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  camperName: string;
};

export default function BookingForm({ camperName }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // тут міг би бути POST на бекенд
    toast.success("Бронювання успішно відправлено!");

    setName("");
    setEmail("");
    setDate("");
    setComment("");
  };

  return (
    <div className={css.card}>
      <Toaster position="top-right" />
      <h3>Book your campervan now</h3>
      <p className={css.sub}>
        Stay connected! We are always ready to help you.
      </p>
      <p className={css.camper}>{camperName}</p>

      <form onSubmit={handleSubmit} className={css.form}>
        <input
          type="text"
          placeholder="Name*"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email*"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="date"
          placeholder="Booking date*"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          placeholder="Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <button type="submit" className={css.btn}>
          Send
        </button>
      </form>
    </div>
  );
}