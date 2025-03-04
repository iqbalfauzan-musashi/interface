import React from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const Select = () => {
  const repairs = [
    {
      No: 1,
      Jam: '08:00',
      Mesin: 'Conveyor Otomatis',
      Kerusakan: 'Belt aus',
      PenanggungJawab: 'John Doe',
      Status: 'Dalam Perbaikan',
    },
    {
      No: 2,
      Jam: '09:30',
      Mesin: 'Robot Lengan (Robotic Arm)',
      Kerusakan: 'Kabel putus',
      PenanggungJawab: 'Jane Smith',
      Status: 'Selesai',
    },
    {
      No: 3,
      Jam: '11:00',
      Mesin: 'Mesin CNC',
      Kerusakan: 'Coolant bocor',
      PenanggungJawab: 'Alice Johnson',
      Status: 'Menunggu Suku Cadang',
    },
    {
      No: 4,
      Jam: '13:00',
      Mesin: 'Press Machine',
      Kerusakan: 'Silinder bocor',
      PenanggungJawab: 'Ahmad Fauzi',
      Status: 'Dalam Perbaikan',
    },
    {
      No: 5,
      Jam: '14:30',
      Mesin: 'Packing Machine',
      Kerusakan: 'Sensor tidak berfungsi',
      PenanggungJawab: 'Budi Santoso',
      Status: 'Selesai',
    },
    {
      No: 6,
      Jam: '15:00',
      Mesin: 'Laser Cutting',
      Kerusakan: 'Lensa kotor',
      PenanggungJawab: 'Citra Dewi',
      Status: 'Dalam Perbaikan',
    },
    {
      No: 7,
      Jam: '16:00',
      Mesin: 'Injection Molding',
      Kerusakan: 'Heater rusak',
      PenanggungJawab: 'Dewi Kusuma',
      Status: 'Menunggu Suku Cadang',
    },
    {
      No: 8,
      Jam: '17:30',
      Mesin: 'Grinding Machine',
      Kerusakan: 'Motor overheating',
      PenanggungJawab: 'Eko Prasetyo',
      Status: 'Dalam Perbaikan',
    },
    {
      No: 9,
      Jam: '19:00',
      Mesin: 'Assembly Robot',
      Kerusakan: 'Servo macet',
      PenanggungJawab: 'Fajar Setiawan',
      Status: 'Selesai',
    },
    {
      No: 10,
      Jam: '20:00',
      Mesin: 'Filling Machine',
      Kerusakan: 'Pompa tidak bekerja',
      PenanggungJawab: 'Gita Andini',
      Status: 'Dalam Perbaikan',
    },
  ]

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Tabel Perbaikan Mesin</strong>
          </CCardHeader>
          <CCardBody>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Jam</th>
                  <th>Mesin</th>
                  <th>Kerusakan</th>
                  <th>Penanggung Jawab</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {repairs.map((repair) => (
                  <tr key={repair.No}>
                    <td>{repair.No}</td>
                    <td>{repair.Jam}</td>
                    <td>{repair.Mesin}</td>
                    <td>{repair.Kerusakan}</td>
                    <td>{repair.PenanggungJawab}</td>
                    <td>{repair.Status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Select
