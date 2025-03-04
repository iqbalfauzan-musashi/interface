import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CSpinner,
  CPagination,
  CPaginationItem,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import axios from 'axios'
import { cilTrash, cilArrowTop, cilArrowBottom } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import '../../../scss/inventoryConfig.scss'

const JobHistory = () => {
  // State declarations remain the same as they serve the same purposes
  const [jobHistory, setJobHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState({ column: 'job_des', direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(50)
  const [deleteItem, setDeleteItem] = useState(null)

  // Data fetching function remains unchanged
  const fetchJobHistory = async () => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3001/api/job-history')
      setJobHistory(response.data || [])
      setError(null)
    } catch (error) {
      console.error('Error fetching job history:', error)
      setError('Gagal memuat riwayat pekerjaan. Silakan coba lagi nanti.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobHistory()
  }, [])

  // Sort handling remains the same
  const handleSort = (column) => {
    const direction = sortOrder.column === column && sortOrder.direction === 'asc' ? 'desc' : 'asc'
    setSortOrder({ column, direction })
  }

  // Delete handling remains the same
  const handleDelete = async () => {
    if (!deleteItem) return

    try {
      await axios.delete(`http://localhost:3001/api/job-history/${deleteItem.no_part}`)
      fetchJobHistory()
      setDeleteItem(null)
    } catch (error) {
      console.error('Error deleting job history:', error)
      setError('Gagal menghapus riwayat pekerjaan. Silakan coba lagi nanti.')
    }
  }

  // Data processing logic remains unchanged
  const sortedJobHistory = [...jobHistory].sort((a, b) => {
    if (sortOrder.direction === 'asc') {
      return a[sortOrder.column] > b[sortOrder.column] ? 1 : -1
    } else {
      return a[sortOrder.column] < b[sortOrder.column] ? 1 : -1
    }
  })

  const filteredJobHistory = sortedJobHistory.filter((item) =>
    item.job_des.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredJobHistory.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  // Loading spinner display remains unchanged
  if (loading) {
    return (
      <div className="spinner-container">
        <CSpinner color="primary" />
      </div>
    )
  }

  // Main component render with updated structure
  return (
    <CRow className="job-list-page">
      {' '}
      {/* Changed to match inventory styling */}
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Riwayat Pekerjaan</strong>
            <div className="search-input">
              <input
                type="text"
                className="form-control"
                placeholder="Cari berdasarkan job description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CCardHeader>
          <CCardBody>
            <div className="table-wrapper">
              {/* Fixed header section with sort indicators */}
              <div className="fixed-header">
                <div className="fixed-header-cell" onClick={() => handleSort('nqp')}>
                  NQP{' '}
                  {sortOrder.column === 'nqp' && (
                    <CIcon icon={sortOrder.direction === 'asc' ? cilArrowTop : cilArrowBottom} />
                  )}
                </div>
                <div className="fixed-header-cell" onClick={() => handleSort('nama_job')}>
                  Nama Job{' '}
                  {sortOrder.column === 'nama_job' && (
                    <CIcon icon={sortOrder.direction === 'asc' ? cilArrowTop : cilArrowBottom} />
                  )}
                </div>
                <div className="fixed-header-cell" onClick={() => handleSort('job_class')}>
                  Job Class{' '}
                  {sortOrder.column === 'job_class' && (
                    <CIcon icon={sortOrder.direction === 'asc' ? cilArrowTop : cilArrowBottom} />
                  )}
                </div>
                <div className="fixed-header-cell" onClick={() => handleSort('sub_section')}>
                  Sub Section{' '}
                  {sortOrder.column === 'sub_section' && (
                    <CIcon icon={sortOrder.direction === 'asc' ? cilArrowTop : cilArrowBottom} />
                  )}
                </div>
                <div className="fixed-header-cell" onClick={() => handleSort('factory')}>
                  Factory{' '}
                  {sortOrder.column === 'factory' && (
                    <CIcon icon={sortOrder.direction === 'asc' ? cilArrowTop : cilArrowBottom} />
                  )}
                </div>
                <div className="fixed-header-cell" onClick={() => handleSort('job_des')}>
                  Job Description{' '}
                  {sortOrder.column === 'job_des' && (
                    <CIcon icon={sortOrder.direction === 'asc' ? cilArrowTop : cilArrowBottom} />
                  )}
                </div>
                <div className="fixed-header-cell" onClick={() => handleSort('update_job')}>
                  Update Job{' '}
                  {sortOrder.column === 'update_job' && (
                    <CIcon icon={sortOrder.direction === 'asc' ? cilArrowTop : cilArrowBottom} />
                  )}
                </div>
                <div className="fixed-header-cell" onClick={() => handleSort('due_date')}>
                  Due Date{' '}
                  {sortOrder.column === 'due_date' && (
                    <CIcon icon={sortOrder.direction === 'asc' ? cilArrowTop : cilArrowBottom} />
                  )}
                </div>
                <div className="fixed-header-cell" onClick={() => handleSort('tanggal_selesai')}>
                  Tanggal Selesai{' '}
                  {sortOrder.column === 'tanggal_selesai' && (
                    <CIcon icon={sortOrder.direction === 'asc' ? cilArrowTop : cilArrowBottom} />
                  )}
                </div>
                <div className="fixed-header-cell">Action</div>
              </div>

              {/* Table container for scrollable content */}
              <div className="table-container">
                <CTable striped hover responsive className="responsive-table">
                  <CTableHead className="d-none">
                    <CTableRow>
                      <CTableHeaderCell>NQP</CTableHeaderCell>
                      <CTableHeaderCell>Nama Job</CTableHeaderCell>
                      <CTableHeaderCell>Job Class</CTableHeaderCell>
                      <CTableHeaderCell>Sub Section</CTableHeaderCell>
                      <CTableHeaderCell>Factory</CTableHeaderCell>
                      <CTableHeaderCell>Job Description</CTableHeaderCell>
                      <CTableHeaderCell>Update Job</CTableHeaderCell>
                      <CTableHeaderCell>Due Date</CTableHeaderCell>
                      <CTableHeaderCell>Tanggal Selesai</CTableHeaderCell>
                      <CTableHeaderCell>Action</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {currentItems.map((job) => (
                      <CTableRow key={job.no_part}>
                        <CTableDataCell>{job.nqp}</CTableDataCell>
                        <CTableDataCell>{job.nama_job}</CTableDataCell>
                        <CTableDataCell>{job.job_class}</CTableDataCell>
                        <CTableDataCell>{job.sub_section}</CTableDataCell>
                        <CTableDataCell>{job.factory}</CTableDataCell>
                        <CTableDataCell>{job.job_des}</CTableDataCell>
                        <CTableDataCell>
                          {job.update_job ? new Date(job.update_job).toLocaleDateString() : '-'}
                        </CTableDataCell>
                        <CTableDataCell>
                          {job.due_date ? new Date(job.due_date).toLocaleDateString() : '-'}
                        </CTableDataCell>
                        <CTableDataCell>
                          {job.tanggal_selesai
                            ? new Date(job.tanggal_selesai).toLocaleDateString()
                            : '-'}
                        </CTableDataCell>
                        <CTableDataCell>
                          <CButton color="danger" size="sm" onClick={() => setDeleteItem(job)}>
                            <CIcon icon={cilTrash} />
                          </CButton>
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </div>
            </div>

            {/* Pagination controls */}
            <CPagination aria-label="Page navigation" className="mt-3">
              <CPaginationItem
                disabled={currentPage === 1}
                onClick={() => paginate(currentPage - 1)}
              >
                Previous
              </CPaginationItem>
              {[...Array(Math.ceil(filteredJobHistory.length / itemsPerPage))].map((_, index) => (
                <CPaginationItem
                  key={index + 1}
                  active={index + 1 === currentPage}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </CPaginationItem>
              ))}
              <CPaginationItem
                disabled={currentPage === Math.ceil(filteredJobHistory.length / itemsPerPage)}
                onClick={() => paginate(currentPage + 1)}
              >
                Next
              </CPaginationItem>
            </CPagination>
          </CCardBody>
        </CCard>

        {/* Error display */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Delete confirmation modal */}
        <CModal visible={!!deleteItem} onClose={() => setDeleteItem(null)}>
          <CModalHeader>
            <CModalTitle>Konfirmasi Hapus</CModalTitle>
          </CModalHeader>
          <CModalBody>
            Apakah Anda yakin ingin menghapus riwayat pekerjaan:
            <br />
            <strong>NQP: {deleteItem?.nqp}</strong>
            <br />
            <strong>Job Description: {deleteItem?.job_des}</strong>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setDeleteItem(null)}>
              Batal
            </CButton>
            <CButton color="danger" onClick={handleDelete}>
              Hapus
            </CButton>
          </CModalFooter>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default JobHistory
