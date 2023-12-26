import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CoinDetailsCard from './CoinDetailsCard';

function Coin() {
  const [coin, setCoin] = useState(null);
  const router = useRouter();
  const { title } = router.query;

  useEffect(() => {
    if (title) {
      fetch(`http://localhost:3001/api/coins/${title}`)
        .then(response => response.json())
        .then(data => setCoin(data));
    }
  }, [title]);

  if (!title) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-wrap justify-around">
      {coin && <CoinDetailsCard coin={coin} />}
    </div>
  )
}

export default Coin;