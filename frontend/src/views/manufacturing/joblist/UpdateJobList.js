import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CModalFooter,
  CSpinner,
  CRow,
  CCol,
  CAlert,
} from '@coreui/react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const UpdateJobList = () => {
  // Get route parameters and navigation function
  const { no_part } = useParams()
  const navigate = useNavigate()

  // Initialize form state with empty values
  const [formData, setFormData] = useState({
    nqp: '',
    nama_job: '',
    job_class: '',
    sub_section: '',
    factory: '',
    job_des: '',
    update_job: '',
    due_date: '',
    status: '',
  })

  // State for managing UI feedback
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  // Predefined options for dropdown menus
  const statusOptions = [
    { value: 'Open', label: 'Open' },
    { value: 'In Progress', label: 'In Progress' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Completed', label: 'Completed' },
  ]

  const factoryOptions = [
    { value: 'Factory 1', label: 'Factory 1' },
    { value: 'Factory 2', label: 'Factory 2' },
    { value: 'Factory 3', label: 'Factory 3' },
  ]

  // Fetch job data when component mounts
  useEffect(() => {
    const fetchJobData = async () => {
      if (!no_part) {
        setError('No job ID provided')
        setLoading(false)
        return
      }

      try {
        const response = await axios.get(`http://localhost:3001/api/job-list/${no_part}`)
        const jobData = response.data

        // Format dates and set form data
        setFormData({
          nqp: jobData.nqp || '',
          nama_job: jobData.nama_job || '',
          job_class: jobData.job_class || '',
          sub_section: jobData.sub_section || '',
          factory: jobData.factory || '',
          job_des: jobData.job_des || '',
          update_job: jobData.update_job
            ? new Date(jobData.update_job).toISOString().split('T')[0]
            : '',
          due_date: jobData.due_date ? new Date(jobData.due_date).toISOString().split('T')[0] : '',
          status: jobData.status || '',
        })
      } catch (error) {
        console.error('Error fetching job:', error)
        setError('Failed to fetch job data. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    fetchJobData()
  }, [no_part])

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Validate form data before submission
  const validateForm = () => {
    const requiredFields = ['nqp', 'nama_job', 'job_des']
    const missingFields = requiredFields.filter((field) => !formData[field])

    if (missingFields.length > 0) {
      throw new Error(`Fields ${missingFields.join(', ')} are required`)
    }
    return true
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try {
      validateForm()
      await axios.put(`http://localhost:3001/api/job-list/${no_part}`, formData)
      setSuccess('Job berhasil diperbarui')

      setTimeout(() => {
        navigate('/manufacturing/joblist')
      }, 1500)
    } catch (error) {
      setError(error.message || 'Failed to update job')
    }
  }

  // Show loading spinner while data is being fetched
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
        <CSpinner />
      </div>
    )
  }

  return (
    <CCard>
      <CCardHeader>
        <strong>Update Job - {formData.nqp}</strong>
      </CCardHeader>
      <CCardBody>
        {error && <CAlert color="danger">{error}</CAlert>}
        {success && <CAlert color="success">{success}</CAlert>}

        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>NQP</CFormLabel>
              <CFormInput
                type="text"
                name="nqp"
                value={formData.nqp}
                onChange={handleInputChange}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Nama Job</CFormLabel>
              <CFormInput
                type="text"
                name="nama_job"
                value={formData.nama_job}
                onChange={handleInputChange}
                required
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Job Class</CFormLabel>
              <CFormInput
                type="text"
                name="job_class"
                value={formData.job_class}
                onChange={handleInputChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Sub Section</CFormLabel>
              <CFormInput
                type="text"
                name="sub_section"
                value={formData.sub_section}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Factory</CFormLabel>
              <CFormSelect name="factory" value={formData.factory} onChange={handleInputChange}>
                <option value="">Select Factory</option>
                {factoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <CFormLabel>Status</CFormLabel>
              <CFormSelect name="status" value={formData.status} onChange={handleInputChange}>
                <option value="">Select Status</option>
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Update Job Date</CFormLabel>
              <CFormInput
                type="date"
                name="update_job"
                value={formData.update_job}
                onChange={handleInputChange}
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Due Date</CFormLabel>
              <CFormInput
                type="date"
                name="due_date"
                value={formData.due_date}
                onChange={handleInputChange}
              />
            </CCol>
          </CRow>

          <div className="mb-3">
            <CFormLabel>Job Description</CFormLabel>
            <CFormInput
              type="text"
              name="job_des"
              value={formData.job_des}
              onChange={handleInputChange}
              required
            />
          </div>

          <CModalFooter className="pt-4">
            <CButton color="secondary" onClick={() => navigate('/manufacturing/joblist')}>
              Batal
            </CButton>
            <CButton color="primary" type="submit">
              Update
            </CButton>
          </CModalFooter>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default UpdateJobList
