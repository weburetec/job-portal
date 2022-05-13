import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../../components/general/Loader'
import { getUnapprovedOrganizations } from '../../redux/actions/organizationActions'
import { IUnapprovedOrganizationsType } from '../../redux/types/organizationTypes'
import { RootStore } from '../../utils/Interface'
import Layout from './../../components/admin/Layout'
import OrganizationDetailModal from './../../components/modal/OrganizationDetailModal'

const OrganizationApproval = () => {
  const [openOrganizationDetailModal, setOpenOrganizationDetailModal] = useState(false)
  const [selectedOrganization, setSelectedOrganization] = useState<Partial<IUnapprovedOrganizationsType>>({})

  const dispatch = useDispatch()
  const { alert, organization, auth } = useSelector((state: RootStore) => state)

  const handleClickDetail = (organization: IUnapprovedOrganizationsType) => {
    setOpenOrganizationDetailModal(true)
    setSelectedOrganization(organization)
  }

  useEffect(() => {
    if (auth.accessToken) {
      dispatch(getUnapprovedOrganizations(auth.accessToken))
    }
  }, [dispatch, auth])

  return (
    <>
      <Layout title='Organization Approval' pageTitle='Organization Approval'>
        {
          alert.loading
          ? <Loader size='xl' />
          : (
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='text-sm bg-[#504ED7] text-white'>
                    <th className='p-3'>No</th>
                    <th>Organization Name</th>
                    <th>Organization Email</th>
                    <th>Industry Type</th>
                    <th>Created Date</th>
                    <th>Registered Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    organization.map((item, idx) => (
                      <tr key={item._id} className='text-center bg-[#F9F9FF] text-sm'>
                        <td className='p-3'>{idx + 1}</td>
                        <td>{item.user.name}</td>
                        <td>{item.user.email}</td>
                        <td>{item.industryType}</td>
                        <td>{new Date(item.createdDate).toLocaleDateString()}</td>
                        <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button onClick={() => handleClickDetail(item)} className='text-xs mr-3 text-white px-3 py-2 bg-blue-500 hover:bg-blue-600 transition-[background] rounded-md'>Detail</button>
                          <button className='bg-green-600 mr-3 hover:bg-green-700 transition-[background] rounded-md text-white px-3 text-xs py-2'>Accept</button>
                          <button className='bg-red-500 hover:bg-red-600 transition-[background[ rounded-md text-white px-3 py-2 text-xs'>Reject</button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          )
        }
      </Layout>

      {
        Object.keys(selectedOrganization).length > 0 &&
        <OrganizationDetailModal
          openModal={openOrganizationDetailModal}
          setOpenModal={setOpenOrganizationDetailModal}
          selectedOrganization={selectedOrganization as IUnapprovedOrganizationsType}
        />
      }
    </>
  )
}

export default OrganizationApproval