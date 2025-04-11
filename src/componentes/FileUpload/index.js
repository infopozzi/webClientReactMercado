import React from 'react';

function FileUploadHandler(props) {
  const aoDigitado = (evento) => {
    const file = evento.target.files[0];
    props.aoAlterado(file);
  };

  return (
    <div>
      <input type="file" onChange={aoDigitado} />
    </div>
  );
}

export default FileUploadHandler;
