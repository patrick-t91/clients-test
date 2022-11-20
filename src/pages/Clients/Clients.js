import { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import styled, { css } from "styled-components";
import { MdOutlineLightMode, MdDarkMode } from "react-icons/md";
import "./Clients.css";

const ThemeApp = styled.div`
  background-image: linear-gradient(180deg, #292643, #41416d);
  color: #ffffff;
  display: flex;
  flex-direction: column;
  ${({ isDarkTheme }) =>
    !isDarkTheme &&
    css`
      background-image: linear-gradient(180deg, #ffffff, #eeefff);
      color: #3d9b51;
    `}
`;

export const Clients = () => {
  const { isDarkTheme, handleTheme } = useContext(ThemeContext);
  const [selectedClient, setSelectedClient] = useState();
  const { clientParam } = useParams();
  const location = useLocation();
  const { clientsParam } = location.state;
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    setSelectedClient(
      clientsParam.find((item) => item.cliente === clientParam)
    );
  }, []);

  useEffect(() => {
    selectedClient && setVideoSrc(selectedClient.linkVideo);
  }, [selectedClient]);

  return (
    <ThemeApp isDarkTheme={isDarkTheme}>
      {isDarkTheme ? (
        <div className="light-icon" onClick={handleTheme}>
          <MdOutlineLightMode className="light-icon" onClick={handleTheme} />
        </div>
      ) : (
        <div className="dark-icon" onClick={() => handleTheme()}>
          <MdDarkMode className="dark-icon" onClick={handleTheme} />
        </div>
      )}
      {selectedClient && (
        <div id="mainContent">
          <h1 className="client-name">{selectedClient.cliente}</h1>
          <p className="test-name">Test: Test de usabilidad en el sitio web </p>
          <p className="tester-name">
            Testeador{" "}
            {clientsParam.findIndex((item) => item.cliente === clientParam) + 1}
          </p>
          {videoSrc && (
            <video controls name="media">
              <source
                src={videoSrc}
                type="video/mp4"
              />
            </video>
          )}
          <div className="transcription-main">
            <p>Transcripción</p>
            <div className="transcription-content">
              {selectedClient.transcripcion}
            </div>
          </div>
          <div className="tasks-main">
            <p className="tasks-title">Tareas</p>
            <p className="tasks-scenario">
              Escenario: {selectedClient.escenario}
            </p>
            <div className="tasks-list">
              {selectedClient &&
                selectedClient.preguntas.map((item, index) => (
                  <div
                    className={`tasks-item${
                      !isDarkTheme ? ` light-theme` : ``
                    }`}
                    key={item.texto}
                  >
                    <p className="task-number">Tarea {index + 1}:</p>
                    <p className="task-text">{item.texto}</p>
                    <p className="task-duration">
                      Duración de la tarea: {item.tiempo}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </ThemeApp>
  );
};
