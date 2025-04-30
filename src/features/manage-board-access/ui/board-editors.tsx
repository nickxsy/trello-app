import { AvatarsList } from '@/entities/user';

import { BoardAccessInfo } from '../model/types';
import { useBoardEditors } from '../model/use-board-editors';

export function BoardEditors({board, className}: { board: BoardAccessInfo, className?: string}) {

  const { editorsWithOwner } = useBoardEditors(board)

  if(!editorsWithOwner){ 
    return null
  }
    

  return (
    <AvatarsList avatarsIds={editorsWithOwner.map(e => e.avatarId)} className={className} />
  )
}