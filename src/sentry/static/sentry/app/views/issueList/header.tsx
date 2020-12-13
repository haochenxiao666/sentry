import React from 'react';
import styled from '@emotion/styled';

import Button from 'app/components/button';
import * as Layout from 'app/components/layouts/thirds';
import QueryCount from 'app/components/queryCount';
import {IconPause, IconPlay} from 'app/icons';
import {t} from 'app/locale';
import space from 'app/styles/space';

import {Query} from './utils';

type Props = {
  query: string;
  queryCount: number;
  queryMaxCount: number;
  realtimeActive: boolean;
  onRealtimeChange: (realtime: boolean) => void;
  onTabChange: (query: string) => void;
};

const queries = [
  [Query.NEEDS_REVIEW, t('Needs Review')],
  [Query.UNRESOLVED, t('Unresolved')],
  [Query.IGNORED, t('Ignored')],
  [Query.REPROCESSING, t('Reprocessing')],
];

function IssueListHeader({
  query,
  queryCount,
  queryMaxCount,
  realtimeActive,
  onTabChange,
  onRealtimeChange,
}: Props) {
  return (
    <React.Fragment>
      <BorderlessHeader>
        <StyledHeaderContent>
          <StyledLayoutTitle>{t('Issues')}</StyledLayoutTitle>
        </StyledHeaderContent>
        <Layout.HeaderActions>
          <Button
            size="small"
            title={t('%s real-time updates', realtimeActive ? t('Pause') : t('Enable'))}
            onClick={() => onRealtimeChange(!realtimeActive)}
          >
            {realtimeActive ? <IconPause size="xs" /> : <IconPlay size="xs" />}
          </Button>
        </Layout.HeaderActions>
      </BorderlessHeader>
      <TabLayoutHeader>
        <Layout.HeaderNavTabs underlined>
          {queries.map(([tabQuery, queryName]) => (
            <li key={tabQuery} className={query === tabQuery ? 'active' : ''}>
              <a onClick={() => onTabChange(tabQuery)}>
                {queryName}{' '}
                {query === tabQuery && (
                  <StyledQueryCount count={queryCount} max={queryMaxCount} />
                )}
              </a>
            </li>
          ))}
        </Layout.HeaderNavTabs>
      </TabLayoutHeader>
    </React.Fragment>
  );
}

export default IssueListHeader;

const StyledLayoutTitle = styled(Layout.Title)`
  margin-top: ${space(0.5)};
`;

const BorderlessHeader = styled(Layout.Header)`
  border-bottom: 0;

  /* Not enough buttons to change direction for mobile view */
  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    flex-direction: row;
  }
`;

const TabLayoutHeader = styled(Layout.Header)`
  padding-top: 0;

  @media (max-width: ${p => p.theme.breakpoints[1]}) {
    padding-top: 0;
  }
`;

const StyledHeaderContent = styled(Layout.HeaderContent)`
  margin-bottom: 0;
`;

const StyledQueryCount = styled(QueryCount)`
  color: ${p => p.theme.gray300};
`;
