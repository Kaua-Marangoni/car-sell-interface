import PropTypes from "prop-types"
import React from "react"

import { ItemsCategory, CategoryImage, CategoryName } from "./styles"

export function CardCategory({ category, activeCategory, setActiveCategory }) {
  return (
    <ItemsCategory
      key={category.id}
      isActiveCategory={activeCategory === category.id}
      onClick={() => setActiveCategory(category.id)}
    >
      {category.path && (
        <CategoryImage
          src={category.url}
          alt={`Imagem da categoria ${category.name}`}
        />
      )}
      <CategoryName>{category.name}</CategoryName>
    </ItemsCategory>
  )
}

CardCategory.propTypes = {
  category: PropTypes.object,
  activeCategory: PropTypes.number,
  setActiveCategory: PropTypes.func
}
