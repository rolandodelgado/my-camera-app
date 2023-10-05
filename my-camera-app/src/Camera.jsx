import React, { useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import * as mp from '@mediapipe/drawing_utils';
import * as mpHands from '@mediapipe/hands';

const Camera = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const runMediaPipe = async () => {
      const hands = new mpHands.Hands();
      hands.setOptions({ maxNumHands: 1 });

      await hands.initialize();

      const camera = webcamRef.current.video;
      camera.width = 640;
      camera.height = 480;

      const canvas = canvasRef.current;
      canvas.width = 640;
      canvas.height = 480;
      const context = canvas.getContext('2d');

      const videoElement = webcamRef.current.video;

      hands.onResults((results) => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        mp.draw.drawResults(context, results);

        // Aquí puedes acceder a los landmarks de las manos detectados en 'results'.
        // Puedes realizar acciones basadas en la posición de los landmarks.
        if (results.multiHandLandmarks) {
          // Por ejemplo, puedes acceder a las coordenadas de un landmark específico:
          const landmark = results.multiHandLandmarks[0][0]; // Obtén el primer landmark de la primera mano
          const x = landmark.x;
          const y = landmark.y;
          // Realiza acciones basadas en estas coordenadas
        }
      });

      const source = new mpHands.CameraInput(videoElement);

      source.start();
      hands.setInput(source);

      requestAnimationFrame(async () => {
        await hands.send({ image: videoElement });
      });
    };

    runMediaPipe();
  }, []);

  const capture = () => {
    // Aquí puedes tomar una captura de pantalla si es necesario
  };

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capturar foto</button>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Camera;