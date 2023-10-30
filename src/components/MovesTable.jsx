/* eslint-disable react/prop-types */
import { Table } from "@mantine/core";
import capitalizeName from "../utils/capitalize";
const MovesTable = ({ array, hasLevel }) => {
  return (
    <Table
      striped
      withTableBorder
      className="table"
      style={{
        width: "50vw",
        margin: "auto",
      }}
    >
      <Table.Thead style={{ backgroundColor: "#053742", color: "#39a2db" }}>
        <Table.Tr>
          {hasLevel ? (
            <Table.Th style={{ textAlign: "center" }}>
              Level Learned At
            </Table.Th>
          ) : undefined}

          <Table.Th style={{ textAlign: "center" }}>Move Name</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {array.map((move) => {
          return (
            <Table.Tr
              key={move.name}
              style={{
                textAlign: "center",
                backgroundColor: "#39a2db",
                color: "black",
              }}
            >
              {hasLevel ? <Table.Td>{move.level}</Table.Td> : undefined}
              <Table.Td>{capitalizeName(move.name)}</Table.Td>
            </Table.Tr>
          );
        })}
      </Table.Tbody>
    </Table>
  );
};

export default MovesTable;
