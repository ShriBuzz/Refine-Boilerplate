// packages
import {
  Create,
  Select,
  TextInput,
  useForm,
  useSelect,
} from '@pankod/refine-mantine';

export const PostCreate: React.FC = () => {
  const { saveButtonProps, getInputProps, errors } = useForm({
    initialValues: {
      title: '',
      status: '',
      category: {
        id: '',
      },
    },
    validate: {
      title: (value) => (value.length < 2 ? 'Too short title' : null),
      status: (value) => (value.length <= 0 ? 'Status is required' : null),
      category: {
        id: (value) => (value.length <= 0 ? 'Category is required' : null),
      },
    },
  });

  const { selectProps } = useSelect({
    resource: 'categories',
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <form>
        <TextInput
          mt={8}
          label='Title'
          placeholder='Title'
          {...getInputProps('title')}
        />
        <Select
          mt={8}
          label='Status'
          placeholder='Pick one'
          {...getInputProps('status')}
          data={[
            { label: 'Published', value: 'published' },
            { label: 'Draft', value: 'draft' },
            { label: 'Rejected', value: 'rejected' },
          ]}
        />
        <Select
          mt={8}
          label='Category'
          placeholder='Pick one'
          {...getInputProps('category.id')}
          {...selectProps}
        />
      </form>
    </Create>
  );
};
