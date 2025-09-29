package services

import (
	"context"
	"blog-backend/bootstrap"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type S3Service struct {
    Client *s3.Client
    Bucket string
}

func NewS3Service(env *bootstrap.Env) (*S3Service, error) {
    creds := credentials.NewStaticCredentialsProvider(env.AWS_ACCESS_KEY, env.AWS_SECRET_KEY, "")
    cfg, err := config.LoadDefaultConfig(
        context.TODO(),
        config.WithCredentialsProvider(creds),
        config.WithRegion("us-east-1"),
    )
    if err != nil {
        return nil, err
    }

    client := s3.NewFromConfig(cfg, func(o *s3.Options) {
        o.BaseEndpoint = aws.String("https://sfo3.digitaloceanspaces.com")
    })

    return &S3Service{
        Client: client,
        Bucket: env.BUCKET_NAME,
    }, nil
}