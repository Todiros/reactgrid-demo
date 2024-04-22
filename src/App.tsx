import './App.css';
import { useState } from 'react';
import { ReactGrid, Column, Row, CellChange} from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";

interface Person {
  name: string;
  surname: string;
}

const getPeople = (): Person[] => [
  { name: "Thomas", surname: "Goldman" },
  { name: "Susie", surname: "Quattro" },
  { name: "", surname: "" }
];

const getColumns = (): Column[] => [
  { columnId: "name", width: 150 },
  { columnId: "surname", width: 150 }
];

const headerRow: Row = {
  rowId: "header",
  cells: [
    { type: "header", text: "Name" },
    { type: "header", text: "Surname" }
  ]
};

const getRows = (people: Person[]): Row[] => [
  headerRow,
  ...people.map<Row>((person, idx) => ({
    rowId: idx,
    cells: [
      { type: "text", text: person.name },
      { type: "text", text: person.surname }
    ]
  }))
];

function App() {
  const [people, setPeople] = useState<Person[]>(getPeople());

  const rows = getRows(people);
  const columns = getColumns();

  const handleChanges = (changes: CellChange[]) => {
    changes.forEach((change) => {
      console.log(people, change)
    });
  };

  return (
    <div className="App" style={{display:"grid", justifyContent:"center"}}>
      <h3>RG</h3>
      <ReactGrid rows={rows} columns={columns} onCellsChanged={handleChanges}/>
    </div>
  );
}

export default App;
