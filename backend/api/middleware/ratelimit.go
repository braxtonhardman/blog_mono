package middleware 


import ( 
	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
	"sync"
)

var visitors = make(map[string]*rate.Limiter)
var mu sync.Mutex

func getVisitor(ip string) *rate.Limiter {
    mu.Lock()
    defer mu.Unlock()

    limiter, exists := visitors[ip]
    if !exists {
        limiter = rate.NewLimiter(2, 5) // 2 req/sec, burst 5
        visitors[ip] = limiter
    }
    return limiter
}

func RateLimiter() gin.HandlerFunc {
    return func(c *gin.Context) {
        ip := c.ClientIP()
        limiter := getVisitor(ip)

        if !limiter.Allow() {
            c.JSON(429, gin.H{"error": "Too Many Requests"})
            c.Abort()
            return
        }

        c.Next()
    }
}

