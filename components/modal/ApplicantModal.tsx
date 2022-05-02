import { useEffect, useRef } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import UserCard from './../general/UserCard'

interface IProps {
  openModal: boolean
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ApplicantModal = ({ openModal, setOpenModal }: IProps) => {
  const modalRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openModal && modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpenModal(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openModal])

  return (
    <div className={`modal-background ${openModal ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div ref={modalRef} className={`${openModal ? 'translate-y-0' : '-translate-y-12'} modal-box max-w-[950px] max-h-[600px] overflow-auto hide-scrollbar`}>
        <div className='modal-box-header'>
          <h1 className='text-lg font-medium'>Applicant List</h1>
          <AiOutlineClose className='cursor-auto' />
        </div>
        <div className='p-7 grid lg:grid-cols-2 grid-cols-1 gap-8'>
          <UserCard isApplicant={true} />
          <UserCard isApplicant={true} />
          <UserCard isApplicant={true} />
          <UserCard isApplicant={true} />
          <UserCard isApplicant={true} />
          <UserCard isApplicant={true} />
          <UserCard isApplicant={true} />
          <UserCard isApplicant={true} />
          <UserCard isApplicant={true} />
          <UserCard isApplicant={true} />
          <UserCard isApplicant={true} />
          <UserCard isApplicant={true} />
          <UserCard isApplicant={true} />
          <UserCard isApplicant={true} />
          <UserCard isApplicant={true} />
        </div>
      </div>
    </div>
  )
}

export default ApplicantModal