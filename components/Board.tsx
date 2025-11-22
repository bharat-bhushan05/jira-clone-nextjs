'use client'
import IssueCard from './IssueCard'
import { useEffect, useState } from 'react'
import Pusher from 'pusher-js'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'

export default function Board({ issues: initialIssues = [], projectId }: any) {
  const [issues, setIssues] = useState(initialIssues || [])

  useEffect(() => {
    // init pusher
    try {
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY || '', { cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER || '' })
      const channel = pusher.subscribe(`project-${projectId}`)
      channel.bind('issue:created', (data: any) => setIssues((prev) => [data, ...prev]))
      channel.bind('issue:updated', (data: any) => setIssues((prev) => prev.map((i: any) => i.id === data.id ? data : i)))
    } catch (e) {
      console.warn('Pusher client not initialized', e)
    }
  }, [projectId])

  async function updateIssuePosition(issueId: string, newStatus: string, newIndex: number) {
    // Persist ordering + status to server
    await fetch('/api/issues', {
      method: 'PATCH',
      body: JSON.stringify({ id: issueId, status: newStatus, orderIndex: newIndex, projectId }),
      headers: { 'Content-Type': 'application/json' }
    })
  }

  function onDragEnd(result: DropResult) {
    const { source, destination, draggableId } = result
    if (!destination) return

    const srcStatus = source.droppableId
    const destStatus = destination.droppableId

    if (srcStatus === destStatus && source.index === destination.index) return

    // update local state
    const issue = issues.find((i: any) => i.id === draggableId)
    if (!issue) return
    const updatedIssue = { ...issue, status: destStatus }

    // re-order list locally (simple approach)
    let newIssues = issues.filter((i: any) => i.id !== draggableId)
    // insert at destination index among items with that status
    const destItems = newIssues.filter((i: any) => i.status === destStatus)
    const before = newIssues.filter((i: any) => i.status !== destStatus)
    destItems.splice(destination.index, 0, updatedIssue)
    newIssues = [...before, ...destItems]
    setIssues(newIssues)

    // persist
    updateIssuePosition(draggableId, destStatus, destination.index).catch(console.error)
  }

  async function handleFileUpload(e: any) {
    const file = e.target.files?.[0]
    if (!file) return
    const res = await fetch('/api/uploads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ filename: file.name, contentType: file.type }) })
    const data = await res.json()
    if (data.uploadUrl) {
      await fetch(data.uploadUrl, { method: 'PUT', body: file })
      alert('Uploaded to S3. Public URL: ' + data.publicUrl)
    } else {
      alert('Upload failed')
    }
  }

  const columns = ['todo', 'in-progress', 'done']

  return (
    <div>
      <div className="mb-4">
        <label className="mr-2">Upload attachment:</label>
        <input type="file" onChange={handleFileUpload} />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {columns.map(col => (
            <Droppable droppableId={col} key={col}>
              {(provided) => (
                <div className="bg-slate-100 p-4 rounded" ref={provided.innerRef} {...provided.droppableProps}>
                  <h4 className="font-semibold mb-2 capitalize">{col.replace('-', ' ')}</h4>
                  <div>
                    {issues.filter((i: any) => i.status === col).map((issue: any, index: number) => (
                      <Draggable draggableId={issue.id} index={index} key={issue.id}>
                        {(provided2) => (
                          <div ref={provided2.innerRef} {...provided2.draggableProps} {...provided2.dragHandleProps}>
                            <IssueCard issue={issue} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  )
}
