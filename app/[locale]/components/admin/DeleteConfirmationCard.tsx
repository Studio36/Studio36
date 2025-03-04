import { motion } from 'motion/react'

interface DeleteConfirmationCardProps {
  setOpen: (open: boolean) => void,
  onDelete: () => void
}

export default function DeleteConfirmationCard({setOpen, onDelete}: DeleteConfirmationCardProps) {

  const variants = {
    initial: {
      opacity: 0
    },
    enter: {
      opacity: 100
    },
    exit: {
      opacity: 0
    }
  }

  return (
    <motion.div exit={'exit'} initial={'initial'} animate={'enter'} variants={variants} className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center z-[100] bg-black bg-opacity-50">
        <div className="absolute w-full h-full bg-dark bg-opacity-35" onClick={(e) => {e.stopPropagation(); setOpen(false)}}></div>
        <div className="bg-white dark:bg-black rounded-xl p-8 z-10">
            <div className="text-lg font-semibold text-dark">Sunteți siguri că doriți să ștergeți?</div>
            <div className="flex justify-end gap-4 mt-12 ml-28">
                <button className="py-2 rounded-lg text-sm hover:opacity-75 transition duration-200" onClick={() => {setOpen(false)}}>Nu, m-am răzgândit</button>
                <button className="bg-red px-6 py-2 rounded-lg text-purewhite hover:opacity-75 transition duration-200" onClick={onDelete}>Da, sunt sigur</button>
            </div>
        </div>
    </motion.div>
  )
}
