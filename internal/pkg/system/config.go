package system

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type Library struct {
	gorm.Model `json:"-"`
	ConfigID   uint   `json:"-"`
	Path       string `json:"path"`
	Type       string `json:"type"`
}

type Config struct {
	gorm.Model `json:"-"`
	Libraries  []Library `json:"movie_paths"`
}

func GetConfig(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var config Config

		result := db.Preload(clause.Associations).Find(&config)
		if result.Error != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": result.Error})
			return
		}

		c.JSON(http.StatusOK, config)
	}
	return gin.HandlerFunc(fn)
}

func SetConfig(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var config = new(Config)

		err := c.BindJSON(&config)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

	}
	return gin.HandlerFunc(fn)
}
