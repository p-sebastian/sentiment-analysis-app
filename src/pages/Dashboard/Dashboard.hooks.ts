import {menuController} from '@ionic/core'
import {useCallback, useEffect} from 'react'
import {useList} from 'react-firebase-hooks/database'

import {db} from '../../config/firebase.config'
import {useShopAction} from '../../hooks/useAction.hook'
import {TMovie} from '../../type/TMovie'
import {TSnapshot} from '../../type/TSnapshot'

const Def: TSnapshot<TMovie>[] = []

const useDashboard = () => {
  const onMenuToggle = useCallback(() => menuController.open('first'), [])
  const [snapshots = Def, loading] = useList(db.ref('movies'))
  const clear = useShopAction('clear')

  useEffect(() => {
    clear()
  }, [])

  return {snapshots: snapshots as typeof Def, loading, onMenuToggle}
}

const useUpcoming = () => {
  const [snapshots = Def, loading] = useList(db.ref('upcoming'))

  return {upcoming: snapshots as typeof Def, loading}
}

export const DashboardHooks = {useDashboard, useUpcoming}
