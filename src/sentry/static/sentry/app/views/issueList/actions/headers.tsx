import React from 'react';
import styled from '@emotion/styled';

import QueryCount from 'app/components/queryCount';
import ToolbarHeader from 'app/components/toolbarHeader';
import {t, tct} from 'app/locale';
import space from 'app/styles/space';
import {GlobalSelection} from 'app/types';

type Props = {
  selection: GlobalSelection;
  statsPeriod: string;
  pageCount: number;
  queryCount: number;
  queryMaxCount: number;
  onSelectStatsPeriod: (statsPeriod: string) => void;
  istReprocessingQuery: boolean;
  hasInbox?: boolean;
};

function Headers({
  selection,
  statsPeriod,
  pageCount,
  queryCount,
  queryMaxCount,
  onSelectStatsPeriod,
  istReprocessingQuery,
  hasInbox,
}: Props) {
  if (istReprocessingQuery) {
    return (
      <React.Fragment>
        <IssuesColumn>{t('Issues')}</IssuesColumn>
        <ProgressColumn>{t('Progress')}</ProgressColumn>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      {hasInbox && (
        <ActionSetPlaceholder>
          {/* total includes its own space */}
          {tct('Select [count] of [total]', {
            count: <React.Fragment>{pageCount}</React.Fragment>,
            total: (
              <QueryCount
                hideParens
                hideIfEmpty={false}
                count={queryCount || 0}
                max={queryMaxCount || 1}
              />
            ),
          })}
        </ActionSetPlaceholder>
      )}
      <GraphHeaderWrapper className="hidden-xs hidden-sm">
        <GraphHeader>
          <StyledToolbarHeader>{t('Graph:')}</StyledToolbarHeader>
          <GraphToggle
            active={statsPeriod === '24h'}
            onClick={() => onSelectStatsPeriod('24h')}
          >
            {t('24h')}
          </GraphToggle>
          <GraphToggle
            active={statsPeriod === 'auto'}
            onClick={() => onSelectStatsPeriod('auto')}
          >
            {selection.datetime.period || t('Custom')}
          </GraphToggle>
        </GraphHeader>
      </GraphHeaderWrapper>
      <EventsOrUsersLabel>{t('Events')}</EventsOrUsersLabel>
      <EventsOrUsersLabel>{t('Users')}</EventsOrUsersLabel>
      <AssigneesLabel className="hidden-xs hidden-sm">
        <IssueToolbarHeader>{t('Assignee')}</IssueToolbarHeader>
      </AssigneesLabel>
      {hasInbox && (
        <ActionsLabel>
          <IssueToolbarHeader>{t('Actions')}</IssueToolbarHeader>
        </ActionsLabel>
      )}
    </React.Fragment>
  );
}

export default Headers;

const IssueToolbarHeader = styled(ToolbarHeader)`
  animation: 0.3s FadeIn linear forwards;

  @keyframes FadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const ActionSetPlaceholder = styled(IssueToolbarHeader)`
  @media (min-width: 800px) {
    width: 66.66666666666666%;
  }
  @media (min-width: 992px) {
    width: 50%;
  }

  flex: 1;
  margin-left: ${space(1)};
  margin-right: ${space(1)};
  overflow: hidden;
  min-width: 0;
  white-space: nowrap;
`;

const GraphHeaderWrapper = styled('div')`
  width: 160px;
  margin-left: ${space(2)};
  margin-right: ${space(2)};
  animation: 0.25s FadeIn linear forwards;

  @keyframes FadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const GraphHeader = styled('div')`
  display: flex;
`;

const StyledToolbarHeader = styled(IssueToolbarHeader)`
  flex: 1;
`;

const GraphToggle = styled('a')<{active: boolean}>`
  font-size: 13px;
  padding-left: 8px;

  &,
  &:hover,
  &:focus,
  &:active {
    color: ${p => (p.active ? p.theme.textColor : p.theme.disabled)};
  }
`;

const EventsOrUsersLabel = styled(IssueToolbarHeader)`
  display: inline-grid;
  align-items: center;
  justify-content: flex-end;
  text-align: right;
  width: 60px;
  margin: 0 ${space(2)};

  @media (min-width: ${p => p.theme.breakpoints[3]}) {
    width: 80px;
  }
`;

const AssigneesLabel = styled('div')`
  justify-content: flex-end;
  text-align: right;
  width: 80px;
  margin-left: ${space(2)};
  margin-right: ${space(2)};
`;

const ActionsLabel = styled('div')`
  justify-content: flex-end;
  text-align: right;
  width: 80px;
  margin: 0 ${space(2)};

  @media (max-width: ${p => p.theme.breakpoints[3]}) {
    display: none;
  }
`;

// Reprocessing
const IssuesColumn = styled(ActionSetPlaceholder)`
  margin-left: ${space(2)};
`;

const ProgressColumn = styled(IssueToolbarHeader)`
  margin: 0 ${space(2)};

  width: 120px;

  @media (min-width: ${p => p.theme.breakpoints[1]}) {
    width: 250px;
  }

  @media (min-width: ${p => p.theme.breakpoints[2]}) {
    width: 350px;
  }
`;
