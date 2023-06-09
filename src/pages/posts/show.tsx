//packages
import { useShow, useOne } from '@pankod/refine-core';
import { Show, Title, Text } from '@pankod/refine-mantine';

// types
import { ICategory, IPost } from './types';

export const PostShow: React.FC = () => {
  const { queryResult } = useShow<IPost>();
  const { data, isLoading } = queryResult;
  const record = data?.data;

  const { data: categoryData } = useOne<ICategory>({
    resource: 'categories',
    id: record?.category.id || '',
    queryOptions: {
      enabled: !!record?.category.id,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Title order={5}>Id</Title>
      <Text mt='xs'>{record?.id}</Text>

      <Title mt='xs' order={5}>
        Title
      </Title>
      <Text mt='xs'>{record?.title}</Text>

      <Title mt='xs' order={5}>
        Status
      </Title>
      <Text mt='xs'>{record?.status}</Text>

      <Title mt='xs' order={5}>
        Category
      </Title>
      <Text mt='xs'>{categoryData?.data?.title}</Text>
    </Show>
  );
};
