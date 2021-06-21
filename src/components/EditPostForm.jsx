import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Form } from 'react-bulma-components';

function EditPostForm ({title, content, loading, onSubmit, onCancel}) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const {ref: titleRef, ...titleProps} = register('title', { required: true });
  const {ref: contentRef, ...contentProps} = register('content', { required: true });

  const handleCancelButton = (evt) => {
    evt.preventDefault();
    onCancel();
  }

  useEffect(() => {
    if (title) setValue('title', title);
    if (content) setValue('content', content);
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Form.Field>
        <Form.Label>Title</Form.Label>
        <Form.Control>
          <Form.Input
            color={errors.title?.type === 'required' ? 'danger': ''}
            {...titleProps}
            domRef={titleRef}
          />
        </Form.Control>
        {errors.title?.type === 'required' &&
          <Form.Help color="danger">Title is required</Form.Help>
        }
      </Form.Field>

      <Form.Field>
        <Form.Label>Content</Form.Label>
        <Form.Textarea
          color={errors.content?.type === 'required' ? 'danger': ''}
          {...contentProps}
          domRef={contentRef}
        />
        {errors.content?.type === 'required' &&
          <Form.Help color="danger">Content is required</Form.Help>
      }
      </Form.Field>

      <Form.Field kind="group">
        <Form.Control>
          <Button
            color="link"
            loading={loading}
            disabled={loading}
          >
            Save
          </Button>
        </Form.Control>
        <Form.Control>
          <Button
            color="link"
            colorVariant="light"
            disabled={loading}
            onClick={handleCancelButton}
          >
            Cancel
          </Button>
        </Form.Control>
      </Form.Field>
    </form>
  );
}

export default EditPostForm;
