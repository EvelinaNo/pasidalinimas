import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const Donor = () => {
  const { id } = useParams();

  const [oneDonor, setOneDonor] = useState([]);
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/users/${id}`)
      .then((res) => setOneDonor(res.data))
      .catch((err) => console.log(err));
  },[id]);

  if (!oneDonor) {
    return <div>Palaukite...</div>;
  }

  return (
  <>
  <div>
  Donoras {oneDonor.firstName}
  <img src={oneDonor.image} alt="donoro foto" />
  </div>
  </>
  );
};
