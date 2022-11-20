import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import styled, { css } from "styled-components";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import "./Home.css";

const FILE = "database/db.json";

const ThemeApp = styled.div`
  background-color: #292643;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  ${({ isDarkTheme }) =>
    !isDarkTheme &&
    css`
      background-color: #ffffff;
      color: #3d9b51;
    `}
`;

export const Home = () => {
  const [clientes, setClientes] = useState([]);
  const { isDarkTheme, handleTheme } = useContext(ThemeContext);

  const getDatos = () => {
    fetch(FILE)
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP error: ", response.status);
        }
        return response.json();
      })
      .then((data) => {
        setClientes(data);
      });
  };

  useEffect(() => {
    getDatos();
  }, []);

  return (
    <ThemeApp isDarkTheme={isDarkTheme}>
      <nav>
        <h2>Listado de clientes</h2>
        {isDarkTheme ? (
          <div className="light-icon" onClick={handleTheme}>
            <MdOutlineLightMode className="light-icon" onClick={handleTheme} />
          </div>
        ) : (
          <div className="dark-icon" onClick={() => handleTheme()}>
            <MdDarkMode className="dark-icon" onClick={handleTheme} />
          </div>
        )}
      </nav>
      {
        <div id="linksContainer">
          {clientes.map((cliente) => (
            <Link
              key={cliente.cliente}
              to={`/client/${cliente.cliente}`}
              className={isDarkTheme ? "dark-mode-link" : "light-mode-link"}
              state={{ clientsParam: clientes }}
            >
              {cliente.cliente}
            </Link>
          ))}
        </div>
      }
    </ThemeApp>
  );
};
