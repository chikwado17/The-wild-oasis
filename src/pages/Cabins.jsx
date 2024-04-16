import { useEffect, useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { getCabins } from "../services/apiCabins";

function Cabins() {
  const [cabins, setCabins] = useState();

  useEffect(() => {
    const fetchCabins = async () => {
      const res = await getCabins();
      setCabins(res);
    };

    fetchCabins();
  }, []);

  console.log(cabins);

  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
    </Row>
  );
}

export default Cabins;
