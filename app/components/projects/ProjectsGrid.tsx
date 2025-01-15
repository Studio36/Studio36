import ProjectItemLink from './ProjectItemLink'

const projects = [
    {
        title: 'Ana-Maria',
        service: "Ședință Foto Personalizată",
        image: "/photosets/woman1-1.jpg",
    },
    {
        title: 'Sofia',
        service: "Ședință Foto Personalizată",
        image: "/photosets/woman2-1.png",
    },
    {
        title: 'Nastea',
        service: "Ședință Foto Personalizată",
        image: "/photosets/project3.jpg",
    },
    {
        title: 'Anna',
        service: "Ședință Foto Personalizată",
        image: "/photosets/project4.png",
    },
    {
        title: 'Tandrețea Florilor',
        service: "Ședință Foto Personalizată",
        image: "/photosets/project5.png",
    },
    {
        title: 'Clip Video',
        service: "Ședință Foto Personalizată",
        image: "/photosets/project6.png",
    }
]

interface ProjectsGridProps {
    setIsActive: (isActive: boolean) => void,
    setIsLinkClicked: (isLinkClicked: boolean) => void
}

export default function ProjectsGrid({ setIsActive, setIsLinkClicked }: ProjectsGridProps) {
  return (
      <div className='grid grid-cols-3 lg:grid-cols-6 col-span-6 gap-y-4 lg:gap-y-12 lg:[&>*:not(:nth-child(3n))]:pr-6'>
      {
          projects.map((project, index) => {
                return (
                    <div className='flex flex-col col-span-3 lg:col-span-2'  key={index}>
                        <div>
                            <ProjectItemLink image={project.image} title={project.title} index={index} setIsActive={setIsActive} setIsLinkClicked={setIsLinkClicked}/>
                            <p className='text-xl lg:text-2xl font-hedwig mt-1 lg:mt-4'>{project.title}</p>
                            <p className='text-sm lg:text-base'>{project.service}</p>
                        </div>
                    </div>
                )
            })
        }
    </div >
  )
}
