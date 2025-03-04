import React from 'react'

// Dashboard
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Cikarang Plant
const AllCikarang = React.lazy(() => import('./views/cikarang/allcikarang/AllCikarang.js'))
const Algt = React.lazy(() => import('./views/cikarang/algt/Algt'))
const Balancer = React.lazy(() => import('./views/cikarang/balancer/Balancer'))
const Cashting = React.lazy(() => import('./views/cikarang/cashting/Cashting'))
const Finishing = React.lazy(() => import('./views/cikarang/finishing/Finishing'))

// Karawang Plant
const AllKarawang = React.lazy(() => import('./views/karawang/allkarawang/AllKarawang.js'))
const Sc_Camshaft = React.lazy(() => import('./views/karawang/sc_camshaft/Sc_Camshaft.js'))

// Tool Control
const Tool_Control = React.lazy(() => import('./views/tool_control/Tool_Control.js'))

// Kanagata
const Kanagata = React.lazy(() => import('./views/kanagata/Kanagata.js'))
const Cikarang = React.lazy(() => import('./views/cikarang/Cikarang.js'))
const Karawang = React.lazy(() => import('./views/karawang/Karawang.js'))

// Maintenance
const NewProject = React.lazy(() => import('./views/manufacturing/newproject/NewProject.js'))
const Inventory = React.lazy(() => import('./views/manufacturing/inventory/Inventory.js'))
const JobList = React.lazy(() => import('./views/manufacturing/joblist/JobList.js'))
const JobHistory = React.lazy(() => import('./views/manufacturing/jobhistory/JobHistory.js'))
const AddInventory = React.lazy(() => import('./views/manufacturing/inventory/AddInventory'))
const UpdateInventory = React.lazy(() => import('./views/manufacturing/inventory/UpdateInventory'))


// Timeline Project
const Charts = React.lazy(() => import('./views/charts/Charts'))

// MachineDetail
const MachineDetail = React.lazy(() => import('./views/cikarang/machineDetail/MachineDetail.js'))

const routes = [
  // Dashboard
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  // Cikarang Plant
  { path: '/cikarang/allcikarang', name: 'AllCikarang', element: AllCikarang },
  { path: '/cikarang/algt', name: 'Algt', element: Algt },
  { path: '/cikarang/balancer', name: 'Balancer', element: Balancer },
  { path: '/cikarang/cashting', name: 'Cashting', element: Cashting },
  { path: '/cikarang/finishing', name: 'Finishing', element: Finishing },

  // Karawang Plant
  { path: '/karawang/allkarawang', name: 'AllKarawang', element: AllKarawang },
  { path: '/karawang/sc_camshaft', name: 'Sc_Camshaft', element: Sc_Camshaft },

  // Tool Control
  { path: '/tool_control', name: 'Tool_Control', element: Tool_Control },

  // Kanagata
  { path: '/kanagata', name: 'Kanagata', element: Kanagata },
  { path: '/cikarang', name: 'Cikarang', element: Cikarang },
  { path: '/karawang', name: 'Karawang', element: Karawang },

  // Manufacturing
  { path: '/manufacturing/newproject', name: 'NewProject', element: NewProject },
  { path: '/manufacturing/inventory', name: 'Inventory', element: Inventory },
  { path: '/manufacturing/jobhistory', name: 'JobHistory', element: JobHistory },
  { path: '/manufacturing/joblist', name: 'JobList', element: JobList },
  { path: '/manufacturing/inventory/add', name: 'AddInventory', element: AddInventory },

  {
    path: '/manufacturing/inventory/update/:id',
    name: 'UpdateInventory',
    element: UpdateInventory,
  },

  // Maintenance


  // Timeline Project
  { path: '/charts', name: 'Charts', element: Charts },

  // Machine Detail
  { path: '/cikarang/machine/:name', name: 'MachineDetail', element: MachineDetail },
]

export default routes
