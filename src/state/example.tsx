import React, { useState } from "react";

interface GuestListProps {
  title: string;
}

type Guest = {
  name: string;
  age: number;
  isConfirmed: boolean;
};

const GuestList: React.FC<GuestListProps> = ({ title }: GuestListProps) => {
  const [guestList, setGuestList] = useState<Array<Guest>>(new Array<Guest>());
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);
  const [isGuestConfirmed, setIsGuestConfirmed] = useState<boolean>(false);
  const [guestSearch, setGuestSearch] = useState<Guest | null>(null);
  let [guestSearchString, setGuestSearchString] = useState<string>("");

  function addToGuestList(): void {
    if (!name || !age) {
      return;
    }
    const newGuest: Guest = {
      name: name,
      age: age,
      isConfirmed: isGuestConfirmed,
    };

    setGuestList([...guestList, newGuest]);
    setName("");
    setIsGuestConfirmed(false);
    setAge(0);
  }

  function clearGuestList(): void {
    setGuestList(new Array<Guest>());
    setName("");
  }

  function deleteGuest(idx: number): void {
    const newGuestList = [...guestList];
    newGuestList.splice(idx, 1);
    setGuestList(newGuestList);
  }

  function searchGuestList(name: string): void {
    if (!name) {
      /**
       * TODO: set text saying invalid name
       */
      return;
    }

    if (guestList.length === 0) {
      /**TODO: Set error text */
      setGuestSearch(null);
      return;
    }
    let guest = guestList.find((g) => g.name === name);
    console.log({ guest });
    setGuestSearch(guest ?? null);
  }



  return (
    <div>
      <h2>{title}</h2>
      {guestList.length > 0 ? (
        <ul>
          {guestList.map((guest: Guest, idx: number) => {
            return (
              <li key={guest.name}>
                {guest.name}{" "}
                <span key={"delete" + idx} onClick={(e) => deleteGuest(idx)}>
                  {" "}
                  X{" "}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>No Guests Yet...</div>
      )}
      Guest Name:
      <input
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
        }}
      ></input>
      <br />
      Guest Age:
      <input
        type="number"
        value={age}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setAge(parseInt(e.target.value));
        }}
      ></input>
      <br />
      Confirmed for party:
      <input
        type="checkbox"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.checked);
          setIsGuestConfirmed(e.target.checked);
        }}
      ></input>
      <br />
      <button onClick={() => addToGuestList()}>Add Guest</button> &nbsp;&nbsp;
      <button
        onClick={() => {
          clearGuestList();
        }}
      >
        Clear Guest List
      </button>
      <br />
      <br />
      <br />
      <input
        type="text"
        value={guestSearchString}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setGuestSearchString(e.target.value);
        }}
      ></input>
      <br />
      <button onClick={() => searchGuestList(guestSearchString)}>
        Search for Guest
      </button>{" "}
      &nbsp;&nbsp;
      {guestSearch && (
        <div>
          <h2>Guest Found</h2>
          <span>Name: {guestSearch?.name}</span>
          <br />
          <span>Age: {guestSearch?.age}</span>
          <br />
          <span>Confirmed: {guestSearch?.isConfirmed ? "Yes" : "No"}</span>
        </div>
      )}
    </div>
  );
};

export default GuestList;
