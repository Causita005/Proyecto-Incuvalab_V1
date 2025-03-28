import './OptionsRUD.css';
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';
import Icon from '@/components/Icon';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function OptionsRUD({id,model,permissions}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="flex items-center rounded-full text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
          <span className="sr-only">Open options</span>
          <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mr-16 z-40 mr-4 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {permissions.read &&
              <Menu.Item>
                {({ active }) =>
                  <Link
                    to={`../${model}/detail/${id}`}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm'
                    )}
                  >
                      <Icon
                          name="EyeIcon"
                          outline={true}
                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                      />
                      Ver
                  </Link>
                }
              </Menu.Item>
            }
            {permissions.update &&
              <Menu.Item>
                {({ active }) =>
                  <Link
                    to={`../${model}/update/${id}`}
                    className={classNames(
                      active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                      'group flex items-center px-4 py-2 text-sm'
                    )}
                  >
                      <Icon
                          name="PencilSquareIcon"
                          outline={true}
                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                      />
                      Editar
                  </Link>
                }
              </Menu.Item>
            }
            {permissions.delete &&
              <Menu.Item>
                {({ active }) =>
                  <Link
                    to={`../${model}/delete/${id}`}
                    className={classNames(
                      active ? 'bg-gray-100 text-red-900' : 'text-red-700',
                      'group flex items-center px-4 py-2 text-sm'
                    )}
                  >
                      <Icon
                          name="TrashIcon"
                          outline={true}
                          className="mr-3 h-5 w-5 text-red-400 group-hover:text-red-500"
                          aria-hidden="true"
                      />
                    Eliminar
                  </Link>
                }
              </Menu.Item>
            }
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
