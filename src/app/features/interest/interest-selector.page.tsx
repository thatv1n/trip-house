import svgSearch from '#/icons/search-mddem.svg';
import { Box, Button, Col, Flex, Input, Row, Tag, Typography } from '@/components';
import { Icon } from '@/components/icon/icon';
import { T } from '@tolgee/react';
import * as R from 'ramda';
import { ChangeEvent, FC, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getListInterestSelector } from './interest.selectors';

interface InterestSelectorPageProps {
  interestSelected: string[];
  onChangeInterests: (interestsIds: string[]) => void;
  onSubmit: () => void;
}

export const InterestSelectorPage: FC<InterestSelectorPageProps> = ({
  interestSelected,
  onChangeInterests,
  onSubmit,
}) => {
  const [search, setSearch] = useState('');
  const interests = useSelector(getListInterestSelector);
  const internalIntersts = useMemo(
    () =>
      interests
        .filter(({ title }) => new RegExp(search).test(title))
        .map(({ id, title }) => ({
          id,
          title,
          isSelected: !!interestSelected.find(R.equals(id)),
        })),
    [interests, interestSelected, search],
  );
  const changeSearchHandler = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  const changeInterestsHandler = (id: string) => () => {
    const isSelected = interestSelected.indexOf(id) !== -1;
    if (isSelected) {
      onChangeInterests(interestSelected.filter(R.compose(R.not, R.equals(id))));
    } else {
      onChangeInterests(R.append(id, interestSelected));
    }
  };

  return (
    <Flex css={{ height: '100%' }} flexDirection="column" justifyContent="space-between">
      <Box>
        <Row marginBottom="2rem">
          <Col>
            <Typography
              css={{
                fontSize: '2.2rem',
                fontWeight: 500,
                '@media (max-width: 734px)': { display: 'none' },
              }}
            >
              Интересы
            </Typography>
          </Col>
        </Row>
        <Row marginBottom="3rem">
          <Col>
            <Input
              value={search}
              onChange={changeSearchHandler}
              placeholder="Поиск"
              icon={<Icon css={{ width: '100%' }} source={svgSearch} />}
            />
          </Col>
        </Row>
        <Row>
          <Col display="flex">
            {internalIntersts.map(({ id, title, isSelected }) => {
              return (
                <Tag
                  key={id}
                  css={{ margin: '0 .8rem .8rem 0', cursor: 'pointer' }}
                  isSelected={isSelected}
                  onClick={changeInterestsHandler(id)}
                >
                  {title}
                </Tag>
              );
            })}
          </Col>
        </Row>
      </Box>
      <Box>
        <Row>
          <Col>
            <Button fullSize onClick={onSubmit}>
              <T keyName="done">Готово</T>
            </Button>
          </Col>
        </Row>
      </Box>
    </Flex>
  );
};
