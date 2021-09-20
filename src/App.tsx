import { useEffect, useState } from "react";
import Form from "./components/from/Form";
import Table from "./components/table/Table";
import TableBody from "./components/tableBody/TableBody";

interface Data {
  firstName: String;
  lastName: String;
  email: String;
  eventDate: Date;
}

function App() {
  const [data, setData] = useState<Array<Data>>([]);
  const [uptade, setUptade] = useState<Boolean>(false);

  const uptadeEvents = () => {
    setUptade(!uptade);
  };

  //    === GET ALL EVENTS FROM DATABASE ===
  useEffect(() => {
    fetch("http://localhost:5000/event")
      .then((response) => response.json())
      .then((data) => {
        setData(data.reverse());
      });
  }, []);

  //    === UPTADE ALL EVENTS FROM DATABASE ===
  useEffect(() => {
    fetch("http://localhost:5000/event")
      .then((response) => response.json())
      .then((data) => setData(data.reverse()));
  }, [uptade]);

  return (
    <main>
      <Form uptade={uptadeEvents} />
      <Table>
        {data === [] ? (
          <h2>Loading...</h2>
        ) : (
          data.map(({ firstName, lastName, email, eventDate }: Data) => {
            return (
              <TableBody
                firstName={firstName}
                lastName={lastName}
                email={email}
                eventDate={eventDate}
              />
            );
          })
        )}
      </Table>
    </main>
  );
}

export default App;
