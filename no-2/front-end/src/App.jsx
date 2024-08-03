import { useEffect, useState } from 'react';
import axios from 'axios';
import { CSVLink } from 'react-csv';

const App = () => {
  const [data, setData] = useState([]);
  const [check, setCheck] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/wiki');
        const htmlString = response.data;
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const rows = doc.querySelectorAll('.wikitable.sortable tbody tr');

        const extractedData = Array.from(rows)
          .map((row) => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
              setCheck(cells[3].textContent.trim());
              return {
                no: cells[0].textContent.trim(),
                kabupaten: cells[2].textContent.trim(),
                provinsi: cells[3].textContent.trim(),
              };
            }
            return null;
          })
          .filter(Boolean);

        setData(extractedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const headers = [
    { label: 'no', key: 'no' },
    { label: 'Kabupaten', key: 'kabupaten' },
    { label: 'Provinsi', key: 'provinsi' },
  ];

  console.log({ check });
  console.log({ data });
  return (
    <div className="w-full">
      <h1 className="text-3xl font-bold my-5 text-center">Data Kabupaten di Indonesia</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="flex justify-center">
            <CSVLink data={data} headers={headers} filename="daftar_kabupaten.csv" className="btn  bg-blue-600 px-3 text-white py-2 rounded-xl mx-auto">
              Download CSV
            </CSVLink>
          </div>

          <div className="overflow-x-auto my-5 flex justify-center w-full">
            <table className="table border w-[700px]">
              <thead className="text-center border">
                <tr>
                  <th>No</th>
                  <th>Kabupaten</th>
                  <th>Provinsi</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{item.no}</td>
                    <td>{item.kabupaten}</td>
                    <td>{item.provinsi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
