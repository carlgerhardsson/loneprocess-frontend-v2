/**
 * Activity Details Component - READ-ONLY VERSION
 * Displays löneprocess-specific fields
 */

import { formatDate } from '@/lib/utils'
import { StatusBadge } from './StatusBadge'
import { PriorityIndicator } from './PriorityIndicator'
import { Tag, User, Clock, CheckSquare } from 'lucide-react'
import type { Activity } from '@/types'

interface ActivityDetailsProps {
  activity: Activity
}

export function ActivityDetails({ activity }: ActivityDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <div className="flex items-center gap-2 mb-2">
          {activity.processNr && (
            <span className="text-sm font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {activity.processNr}
            </span>
          )}
          <div className="flex items-center gap-2 ml-auto">
            <StatusBadge status={activity.status} />
            <PriorityIndicator priority={activity.priority} showLabel />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{activity.process}</h2>
        {activity.behov && <p className="text-gray-600">{activity.behov}</p>}
      </div>

      {/* Core Details Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Fas */}
        <div>
          <dt className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
            <Tag className="w-4 h-4" />
            Fas
          </dt>
          <dd className="text-gray-900">{activity.fas}</dd>
        </div>

        {/* Roll */}
        <div>
          <dt className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
            <User className="w-4 h-4" />
            Roll
          </dt>
          <dd className="text-gray-900">{activity.roll}</dd>
        </div>

        {/* Ska ingå i löneperiod */}
        {activity.skaIngaILoneperiod && (
          <div className="col-span-2">
            <dt className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
              <CheckSquare className="w-4 h-4" />
              Löneperiod
            </dt>
            <dd className="text-gray-900">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Ska ingå i löneperiod
              </span>
            </dd>
          </div>
        )}

        {/* Created & Updated */}
        <div>
          <dt className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Skapad
          </dt>
          <dd className="text-gray-900 text-sm">{formatDate(activity.createdAt)}</dd>
        </div>

        <div>
          <dt className="text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
            <Clock className="w-4 h-4" />
            Uppdaterad
          </dt>
          <dd className="text-gray-900 text-sm">{formatDate(activity.updatedAt)}</dd>
        </div>

        {/* Senast utförd */}
        {activity.senastUtford && (
          <div className="col-span-2">
            <dt className="text-sm font-medium text-gray-500 mb-1">Senast utförd</dt>
            <dd className="text-gray-900 text-sm">{formatDate(activity.senastUtford)}</dd>
          </div>
        )}
      </div>

      {/* Additional Fields Section */}
      {(activity.outInput ||
        activity.effektenVardet ||
        activity.acceptans ||
        activity.featureLosning ||
        activity.extraInfo) && (
        <div className="border-t pt-4 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Ytterligare information</h3>

          {/* Output/Input */}
          {activity.outInput && (
            <div>
              <dt className="text-sm font-medium text-gray-500 mb-1">Output/Input</dt>
              <dd className="text-gray-900">{activity.outInput}</dd>
            </div>
          )}

          {/* Effekten/Värdet */}
          {activity.effektenVardet && (
            <div>
              <dt className="text-sm font-medium text-gray-500 mb-1">Effekten/Värdet</dt>
              <dd className="text-gray-900 whitespace-pre-wrap">{activity.effektenVardet}</dd>
            </div>
          )}

          {/* Acceptans */}
          {activity.acceptans && (
            <div>
              <dt className="text-sm font-medium text-gray-500 mb-1">Acceptans</dt>
              <dd className="text-gray-900 whitespace-pre-wrap">{activity.acceptans}</dd>
            </div>
          )}

          {/* Feature/Lösning */}
          {activity.featureLosning && (
            <div>
              <dt className="text-sm font-medium text-gray-500 mb-1">Feature/Lösning</dt>
              <dd className="text-gray-900 whitespace-pre-wrap">{activity.featureLosning}</dd>
            </div>
          )}

          {/* Extra Info */}
          {activity.extraInfo && (
            <div>
              <dt className="text-sm font-medium text-gray-500 mb-1">Extra information</dt>
              <dd className="text-gray-900 whitespace-pre-wrap">{activity.extraInfo}</dd>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
