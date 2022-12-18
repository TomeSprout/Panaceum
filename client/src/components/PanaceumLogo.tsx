import { Link } from 'react-router-dom'
import { ActionIcon, Tooltip } from '@mantine/core'
import logo from '../assets/potion-placeholder-svgrepo-com.svg'

const PanaceumLogo = () => {
  return (
    <Link to="/">
      <Tooltip label="Panaceum" position="bottom">
        <ActionIcon size="xl" radius='xl'>
          <img src={logo} alt="Panaceum logo" />
        </ActionIcon>
      </Tooltip>
    </Link>
  )
}

export default PanaceumLogo
