import React, { useState } from 'react';
import ReactFileReader from 'react-file-reader';

export const Csv: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string[]>([]);
  const usersFromFirebase = [];

  const handleFiles = (files) => {
    const reader = new FileReader();
    reader.onload = () => {
      const data = reader?.result?.toString();
      if (data) {
        const csvEmails = data.split(/[\n,]/);

        // 重複削除したcsvのデータとfirebaseのデータをを照合
        const selected = Array.from(new Set(csvEmails)).map((csvEmail) => {
          return usersFromFirebase.filter(
            (user) => user.email && user.email.includes(csvEmail)
          );
        });

        setUserEmail((state) => ({ ...state, selected }));
      }
    };
    reader.readAsText(files[0]);
  };
  return (
    <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
      <button>upload csv</button>
    </ReactFileReader>
  );
};
