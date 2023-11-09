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
      <Table.Thead>
        <Table.Tr>
          {hasLevel ? (
            <Table.Th style={{ textAlign: "center", color: "#fa5252" }}>
              Level Learned At
            </Table.Th>
          ) : undefined}

          <Table.Th style={{ textAlign: "center", color: "#fa5252" }}>
            Move Name
          </Table.Th>
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
                fontWeight: 600,
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
