import { addonFragment, recipeFragment, validateResponse } from '@repo/utils';
import { type Tag } from '../types';
import { fetchAddonsQuery, gql } from './fetch-addons-query';

type TagValue = Pick<
  Tag,
  | 'name'
  | 'displayName'
  | 'description'
  | 'icon'
  | 'relatedTags'
  | 'topIntegrations'
>;

interface TagsData {
  tags: TagValue[];
}

async function fetchTagsData({
  isCategory,
}: {
  isCategory?: boolean;
} = {}) {
  let value: TagValue[] = [];
  async function fetchPartialData(skip = 0) {
    const data = await fetchAddonsQuery<
      TagsData,
      { isCategory: boolean; skip: number }
    >(
      gql`
          query Tags($isCategory: Boolean!, $skip: Int!) {
            tags(isCategory: $isCategory, limit: 30, skip: $skip) {
              name
              displayName
              description
              icon
              relatedTags {
                name
                displayName
                icon
              }
              topIntegrations(sort: monthlyDownloads) {
                addons {
                  ${addonFragment}
                }

                recipes {
                  ${recipeFragment}
                  addons {
                    ${addonFragment}
                  }
                }
              }
            }
          }
        `,
      {
        variables: { isCategory: Boolean(isCategory), skip },
      },
    );

    validateResponse(() => data.tags);

    const { tags } = data;

    value = [...value, ...tags];

    if (tags.length > 0) await fetchPartialData(skip + tags.length);

    return value;
  }

  try {
    return await fetchPartialData();
  } catch (error) {
    throw new Error(`Failed to fetch tags data: ${(error as Error).message}`);
  }
}

export async function fetchTagDetailsData(name: string) {
  try {
    // TODO: Cache this data
    const categoriesData = await fetchTagsData({ isCategory: true });
    const tagsData = await fetchTagsData();

    const tag = [...categoriesData, ...tagsData].find((t) => t.name === name);

    // if (!tag) throw new Error(`Tag not found: ${name}`);

    if (!tag) return { error: `Tag not found: ${name}` };

    return {
      ...tag,
      isCategory: categoriesData.find((category) => category.name === name),
    };
  } catch (error) {
    throw new Error(`Failed to fetch tags data: ${(error as Error).message}`);
  }
}
