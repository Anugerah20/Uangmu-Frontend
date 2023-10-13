import { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import TotalMoney from '../components/TotalAmout';
import DataNoteTable from '../components/DataNoteTable';
import ModalNote from '../components/ModalNote';

const TakeNotes = () => {
     document.title = 'Uangmu | Catatan';

     const [deskripsi, setDeskripsi] = useState('');
     const [tanggal, setTanggal] = useState('');
     const [nominal, setNominal] = useState('');
     const [savedData, setSavedData] = useState([]);
     const [openModal, setOpenModal] = useState(false);
     const [jenisCatatan, setJenisCatatan] = useState('');
     const [totalPemasukan, setTotalPemasukan] = useState(0);
     const [totalPengeluaran, setTotalPengeluaran] = useState(0);
     const [totalUang, setTotalUang] = useState(0);

     // State Input
     const handlerInputChange = (e, inputName) => {
          const newValue = e.target.value;
          switch (inputName) {
               case 'deskripsi':
                    setDeskripsi(newValue);
                    break;
               case 'tanggal':
                    setTanggal(newValue);
                    break;
               case 'nominal':
                    setNominal(newValue);
                    break;
               case 'jenisCatatan':
                    setJenisCatatan(newValue);
                    break;
               default:
                    break;
          }
     }

     // Validation input
     const handleSubmit = (e) => {
          e.preventDefault();

          if (deskripsi === '' || tanggal === '' || nominal === '' || jenisCatatan === '') {
               alert('Harus mengisi semua input');
               return;
          }

          if (isNaN(nominal)) {
               alert('Nominal hanya menerima angka');
               return;
          }

          // Storage
          const newDataNote = {
               deskripsi,
               tanggal,
               nominal: parseFloat(nominal),
               jenis: jenisCatatan,
          };

          let totalUangBaru = totalUang;

          if (jenisCatatan === 'pemasukan') {
               setTotalPemasukan(totalPemasukan + newDataNote.nominal);
               totalUangBaru += newDataNote.nominal;
          } else {
               setTotalPengeluaran(totalPengeluaran + newDataNote.nominal);
               totalUangBaru -= newDataNote.nominal;
          }

          setTotalUang(totalUangBaru);

          const updatedData = [...savedData, newDataNote];
          setSavedData(updatedData);

          setDeskripsi('');
          setTanggal('');
          setNominal('');
          setJenisCatatan('');
          setOpenModal(false);
     };

     return (
          <>
               <Navigation />

               <div className="flex flex-wrap">
                    {/* START: TOTAL MONEY */}
                    <TotalMoney totalUang={totalUang} />
                    {/* END: TOTAL MONEY */}

                    {/* START: MEMASUKKAN DATA */}
                    <div className="flex flex-col mx-auto md:mt-12 sm:mt-0 lg:mt-12 w-[85%] sm:w-1/2 md:w-2/5 lg:w-[40%]">
                         <table className="border-collapse border border-gray-300 rounded-md text-center">
                              <thead className="border">
                                   <tr>
                                        <th className="border-gray-300">Deskripsi</th>
                                        <th className="border-gray-300">Tanggal</th>
                                        <th className="border-gray-300">Nominal</th>
                                        <th className="border-gray-300">Jenis</th>
                                   </tr>
                              </thead>
                              <tbody>
                                   {savedData.length === 0 ? (
                                        <tr>
                                             <td colSpan="4" className="border font-bold p-4">
                                                  Catatan uangmu tidak tersedia
                                             </td>
                                        </tr>
                                   ) : (
                                        savedData.map((data, index) => (
                                             <DataNoteTable
                                                  key={index}
                                                  savedData={data}
                                             />
                                        ))
                                   )}
                              </tbody>
                         </table>
                    </div >
                    {/* END: MEMASUKKAN DATA */}

                    {/* START: MODAL KEUANGAN */}
                    <ModalNote
                         openModal={openModal}
                         setOpenModal={setOpenModal}
                         deskripsi={deskripsi}
                         tanggal={tanggal}
                         nominal={nominal}
                         jenisCatatan={jenisCatatan}
                         setJenisCatatan={setJenisCatatan}
                         handlerInputChange={handlerInputChange}
                         handleSubmit={handleSubmit}
                    />
                    {/* END: MODAL KEUANGAN */}
               </div >
               <Footer />
          </>
     );
};

export default TakeNotes;
